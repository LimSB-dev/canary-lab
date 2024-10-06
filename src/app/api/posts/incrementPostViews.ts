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
    await sql.query(
      `
      UPDATE posts
      SET views = views + 1
      WHERE index = $1
      `,
      [index]
    );

    revalidatePath(`/posts/${index}`);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to increment post views.");
  }
}
