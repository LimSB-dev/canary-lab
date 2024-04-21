import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchPosts() {
  noStore();

  try {
    const posts = await sql<IPost>`SELECT * FROM posts`;

    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}

export async function fetchPostById(id: string) {
  noStore();

  try {
    const post = await sql<IPost>`SELECT * FROM posts WHERE id='${id}'`;

    return post.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post data.");
  }
}
