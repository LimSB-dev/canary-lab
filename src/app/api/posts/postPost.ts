"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import camelcaseKeys from "camelcase-keys";

/**
 * 게시물을 생성합니다.
 * @param title 게시물 제목
 * @param markdownValue 게시물 내용
 */
export async function postPost({
  title,
  markdownValue,
}: {
  title: string;
  markdownValue: string;
}) {
  noStore();

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        index SERIAL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}',
        comments UUID[] DEFAULT '{}',
        created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at DATE DEFAULT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        likes INT DEFAULT 0,
        views INT DEFAULT 0
      )
    `;

    await sql.query(
      `
      INSERT INTO posts (title, content)
      VALUES ($1, $2)
    `,
      [title, markdownValue]
    );

    const { rows } =
      await sql`SELECT index FROM posts ORDER BY index DESC LIMIT 1`;

    revalidatePath(`/posts/${rows[0].index}`);
    redirect(`/posts/${rows[0].index}`);

    return camelcaseKeys(rows[0], { deep: true }) as IPost;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recent posts data.");
  }
}
