"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys from "camelcase-keys";

/**
 * 게시물 데이터
 * status가 published인 게시물만 가져옵니다.
 * created_at 칼럼을 기준으로 내림차순 정렬하여 최신 게시물부터 가져옵니다.
 */
export async function getPosts(): Promise<IPost[]> {
  noStore();

  try {
    const { rows } =
      await sql`SELECT * FROM posts WHERE status = 'published' ORDER BY created_at DESC`; // 내림차순 정렬

    const post = camelcaseKeys(rows, { deep: true }) as IPost[];
    return post;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}
