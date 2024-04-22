import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function GET({ id }: { id: string }) {
  noStore();

  try {
    const post = await sql<IPost>`SELECT * FROM posts WHERE id = ${id}`;

    return post.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post data.");
  }
}

export async function POST({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  noStore();

  try {
    await sql`
      INSERT INTO posts (title, content)
      VALUES (${title}, ${content})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create post data.");
  }
}

export async function PUT({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  noStore();

  try {
    await sql`
      UPDATE posts
      SET title = ${title}, content = ${content}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update post data.");
  }
}

export async function DELETE({ id }: { id: string }) {
  noStore();

  try {
    await sql`
      DELETE FROM posts
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete post data.");
  }
}
