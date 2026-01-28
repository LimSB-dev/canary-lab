"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys from "camelcase-keys";
import { ensureCommentsTable } from "@/utils/ensureCommentsTable";

/**
 * 특정 게시글의 댓글 목록을 가져옵니다.
 * @param postIndex 게시글의 index
 * @returns 댓글 목록
 */
export async function getComments(postIndex: number): Promise<IComment[]> {
  noStore();

  try {
    // 테이블이 없으면 생성
    await ensureCommentsTable();

    // 먼저 게시글 ID를 가져옵니다
    const { rows: postRows } = await sql`
      SELECT id FROM posts WHERE index = ${postIndex} AND status = 'published'
    `;

    if (!postRows[0]) {
      return [];
    }

    const postId = postRows[0].id;

    // 댓글을 가져오면서 사용자 정보도 함께 조인
    const { rows } = await sql`
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
      WHERE c.post_id = ${postId} AND c.deleted_at IS NULL
      ORDER BY c.created_at ASC
    `;

    return camelcaseKeys(rows, { deep: true }) as IComment[];
  } catch (error) {
    console.error("Database Error:", error);
    // 테이블이 없거나 에러가 발생하면 빈 배열 반환
    return [];
  }
}
