"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys from "camelcase-keys";

/**
 * 게시물의 index를 이용하여 게시물을 가져옵니다.
 * @param index 게시물의 index
 * @returns 게시물 데이터
 */
export async function getPost(index: number): Promise<IPost> {
  noStore();

  try {
    const { rows } = await sql`SELECT * FROM posts WHERE index = ${index}`;

    return camelcaseKeys(rows[0], { deep: true }) as IPost;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post data by index.");
  }
}
