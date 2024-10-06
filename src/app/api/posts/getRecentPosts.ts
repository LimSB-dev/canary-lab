"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys from "camelcase-keys";

/**
 * 캐러셀에 표시할 최근 게시물을 가져옵니다.
 * 캐러셀에 표시할 게시글의 수는 size로 지정합니다.
 * status가 published인 게시물만 가져옵니다.
 * @param size 캐러셀에 표시할 게시글의 수
 * @param offset 캐러셀에 표시할 게시글의 시작 위치
 * @returns
 */
export async function getRecentPosts(
  size: number,
  offset: number
): Promise<IPost[]> {
  noStore();

  try {
    const { rows } =
      await sql`SELECT * FROM posts WHERE status = 'published' ORDER BY created_at DESC LIMIT ${size} OFFSET ${offset}`;

    return camelcaseKeys(rows, { deep: true }) as IPost[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recent posts data.");
  }
}
