"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * 게시물을 삭제 상태로 변경합니다.
 * @param id 게시물 ID
 */
export async function deletePost(index: number) {
  noStore();

  const date = new Date().toISOString().split("T")[0];

  await sql.query(
    `
      UPDATE posts
      SET status = 'deleted', deleted_at = $1
      WHERE index = $2
    `,
    [date, index]
  );

  revalidatePath(`/posts/${index}`);
  redirect("/posts");
}
