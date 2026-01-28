"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { ensureCommentsTable } from "@/utils/ensureCommentsTable";

/**
 * 댓글을 수정합니다.
 * @param commentId 댓글 ID
 * @param content 댓글 내용
 */
export async function putComment({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}): Promise<void> {
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

  // 입력 검증
  if (!content || !content.trim()) {
    throw new Error("댓글 내용을 입력해주세요.");
  }

  try {
    // 테이블이 없으면 생성
    await ensureCommentsTable();

    // 사용자 ID 가져오기
    const { rows: userRows } = await sql`
      SELECT id FROM users WHERE email = ${userEmail}
    `;

    if (!userRows[0]) {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }

    const userId = userRows[0].id;

    // 댓글 소유권 확인 및 수정
    const { rows: commentRows } = await sql`
      UPDATE comments
      SET content = ${content.trim()}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${commentId} 
        AND user_id = ${userId} 
        AND deleted_at IS NULL
      RETURNING post_id
    `;

    if (!commentRows[0]) {
      throw new Error("댓글을 찾을 수 없거나 수정 권한이 없습니다.");
    }

    // 게시글 index 가져오기
    const { rows: postRows } = await sql`
      SELECT index FROM posts WHERE id = ${commentRows[0].post_id}
    `;

    if (postRows[0]) {
      revalidatePath(`/posts/${postRows[0].index}`);
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "댓글 수정 중 오류가 발생했습니다."
    );
  }
}
