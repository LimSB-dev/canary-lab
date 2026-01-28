"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

/**
 * 게시물의 조회수를 증가시킵니다.
 * @param index 게시물의 index
 */
export async function incrementPostViews(index: number) {
  noStore();

  try {
    await sql`
      UPDATE posts
      SET views = views + 1
      WHERE index = ${index} AND status = 'published'
    `;

    revalidatePath(`/posts/${index}`);
  } catch (error) {
    console.error("Database Error:", error);
    // 조회수 증가 실패는 치명적이지 않으므로 에러를 던지지 않음
  }
}
