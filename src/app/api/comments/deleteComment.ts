"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { ensureCommentsTable } from "@/utils/ensureCommentsTable";

/**
 * 댓글을 삭제합니다 (soft delete).
 * @param commentId 댓글 ID
 */
export async function deleteComment(commentId: string): Promise<void> {
  noStore();

  // 인증 체크
  const session = await auth();
  console.log("session", session);
  if (!session?.user) {
    throw new Error("Unauthorized: 로그인이 필요합니다.");
  }

  const userEmail = session.user.email;
  if (!userEmail) {
    throw new Error("Unauthorized: 사용자 이메일 정보를 찾을 수 없습니다.");
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

    // 댓글 소유권 확인 및 삭제
    const { rows: commentRows } = await sql`
      UPDATE comments
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = ${commentId} 
        AND user_id = ${userId}
        AND deleted_at IS NULL
      RETURNING post_id
    `;

    if (!commentRows[0]) {
      throw new Error("댓글을 찾을 수 없거나 삭제 권한이 없습니다.");
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
        : "댓글 삭제 중 오류가 발생했습니다."
    );
  }
}
