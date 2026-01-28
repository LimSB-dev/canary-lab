"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth } from "@/auth";

/**
 * 게시글 좋아요를 토글합니다.
 * @param postIndex 게시글의 index
 * @returns 좋아요 상태 (true: 좋아요 추가됨, false: 좋아요 취소됨)
 */
export async function togglePostLike(postIndex: number): Promise<boolean> {
  noStore();

  // 인증 체크
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: 로그인이 필요합니다.");
  }

  const userEmail = session.user.email;
  if (!userEmail) {
    throw new Error("Unauthorized: 사용자 이메일 정보를 찾을 수 없습니다.");
  }

  try {
    // 게시글 ID 가져오기
    const { rows: postRows } = await sql`
      SELECT id, likes FROM posts WHERE index = ${postIndex} AND status = 'published'
    `;

    if (!postRows[0]) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }

    const postId = postRows[0].id;
    const currentLikes = postRows[0].likes || [];

    // 사용자 ID 가져오기
    const { rows: userRows } = await sql`
      SELECT id FROM users WHERE email = ${userEmail}
    `;

    if (!userRows[0]) {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }

    const userId = userRows[0].id;

    // 좋아요 배열이 문자열인 경우 파싱
    let likesArray: string[] = [];
    if (typeof currentLikes === "string") {
      try {
        likesArray = JSON.parse(currentLikes);
      } catch {
        likesArray = Array.isArray(currentLikes) ? currentLikes : [];
      }
    } else if (Array.isArray(currentLikes)) {
      likesArray = currentLikes;
    }

    // 좋아요 토글
    const isLiked = likesArray.includes(userId);
    let newLikes: string[];
    let isNowLiked: boolean;

    if (isLiked) {
      // 좋아요 취소
      newLikes = likesArray.filter((id) => id !== userId);
      isNowLiked = false;
    } else {
      // 좋아요 추가
      newLikes = [...likesArray, userId];
      isNowLiked = true;
    }

    // 데이터베이스 업데이트 (likes 컬럼은 uuid[] 타입)
    await sql`
      UPDATE posts 
      SET likes = ${newLikes}
      WHERE id = ${postId}
    `;

    revalidatePath(`/posts/${postIndex}`);
    revalidatePath("/posts");
    revalidatePath("/");

    return isNowLiked;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "좋아요 처리 중 오류가 발생했습니다."
    );
  }
}
