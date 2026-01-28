"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys from "camelcase-keys";

/**
 * published 상태인 게시물의 title과 content를 돌며 search와 유사한 내용이 있는 게시물을 가져옵니다.
 * @param search 게시물의 title과 content에서 찾아볼 search
 * @returns 게시물 데이터
 */
export async function getSearchedPost(search: string): Promise<IPost[]> {
  noStore();

  if (!search || !search.trim()) {
    return [];
  }

  try {
    const searchTerm = `%${search.trim()}%`;
    const { rows } = await sql`
      SELECT * FROM posts 
      WHERE (title ILIKE ${searchTerm} OR content ILIKE ${searchTerm})
      AND status = 'published'
      ORDER BY created_at DESC
    `;

    return camelcaseKeys(rows, { deep: true }) as IPost[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("게시물 검색 중 오류가 발생했습니다.");
  }
}
