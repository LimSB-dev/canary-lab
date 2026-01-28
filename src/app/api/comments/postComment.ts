"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth } from "@/auth";
import camelcaseKeys from "camelcase-keys";
import { ensureCommentsTable } from "@/utils/ensureCommentsTable";

/**
 * 댓글을 생성합니다.
 * @param postIndex 게시글의 index
 * @param content 댓글 내용
 */
export async function postComment({
  postIndex,
  content,
}: {
  postIndex: number;
  content: string;
}): Promise<IComment> {
  noStore();

  // 인증 체크
  const session = await auth();
  console.log("session", session);
  if (!session?.user) {
    throw new Error("Unauthorized: 로그인이 필요합니다.");
  }

  // 이메일이 없으면 에러
  const userEmail = session.user.email;
  if (!userEmail) {
    throw new Error("Unauthorized: 사용자 이메일 정보를 찾을 수 없습니다.");
  }

  // 입력 검증
  if (!content || !content.trim()) {
    throw new Error("댓글 내용을 입력해주세요.");
  }

  try {
    // 테이블이 없으면 생성
    await ensureCommentsTable();

    // 게시글 ID 가져오기
    const { rows: postRows } = await sql`
      SELECT id FROM posts WHERE index = ${postIndex} AND status = 'published'
    `;

    if (!postRows[0]) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }

    const postId = postRows[0].id;

    // 사용자 ID 가져오기
    const { rows: userRows } = await sql`
      SELECT id FROM users WHERE email = ${userEmail}
    `;

    if (!userRows[0]) {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }

    const userId = userRows[0].id;

    // 댓글 생성
    const { rows } = await sql`
      INSERT INTO comments (post_id, user_id, content)
      VALUES (${postId}, ${userId}, ${content.trim()})
      RETURNING 
        id,
        post_id as "postId",
        user_id as "userId",
        content,
        created_at as "createdAt",
        updated_at as "updatedAt",
        deleted_at as "deletedAt"
    `;

    // 사용자 정보 조인하여 반환
    const { rows: commentWithUser } = await sql`
      SELECT 
        c.id,
        c.post_id as "postId",
        p.index as "postIndex",
        c.user_id as "userId",
        u.email as "userEmail",
        u.name as "userName",
        u.image as "userImage",
        c.content,
        c.created_at as "createdAt",
        c.updated_at as "updatedAt",
        c.deleted_at as "deletedAt"
      FROM comments c
      INNER JOIN posts p ON c.post_id = p.id
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.id = ${rows[0].id}
    `;

    revalidatePath(`/posts/${postIndex}`);

    return camelcaseKeys(commentWithUser[0], { deep: true }) as IComment;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "댓글 작성 중 오류가 발생했습니다."
    );
  }
}
