"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys from "camelcase-keys";

/**
 * 태그 데이터
 * index 칼럼을 기준으로 오름차순 정렬하여 최신 게시물부터 가져옵니다.
 */
export async function getTags(): Promise<ITag[]> {
  noStore();

  try {
    const { rows } = await sql`SELECT * FROM tags ORDER BY index ASC`; // 오름차순

    const tags = camelcaseKeys(rows, { deep: true }) as ITag[];
    return tags;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tags data.");
  }
}
