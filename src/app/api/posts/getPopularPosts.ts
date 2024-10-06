"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys from "camelcase-keys";

/**
 * 인기 게시물을 가져옵니다.
 * 인기 게시물은 조회수가 높은 순서로 정렬하여 가져옵니다.
 * status가 published인 게시물만 가져옵니다.
 * @returns 인기 게시물 데이터
 */
export async function getPopularPosts(): Promise<IPost[]> {
  noStore();

  try {
    const { rows } =
      await sql`SELECT * FROM posts WHERE status = 'published' ORDER BY views DESC LIMIT 5`;

    return camelcaseKeys(rows, { deep: true }) as IPost[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch popular posts data.");
  }
}
