"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * 게시물을 수정합니다.
 * @param index 게시물 index
 * @param title 게시물 제목
 * @param markdownValue 게시물 내용
 */
export async function putPost({
  index,
  title,
  markdownValue,
}: {
  index: number;
  title: string;
  markdownValue: string;
}) {
  noStore();

  await sql.query(
    `
    UPDATE posts
    SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP
    WHERE index = $3
    `,
    [title, markdownValue, index]
  );

  revalidatePath(`/posts/${index}`);
  redirect(`/posts/${index}`);

  return index;
}
