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

export async function fetchPopularPosts() {
  noStore();

  try {
    const request =
      await sql<IPost>`SELECT * FROM posts ORDER BY views DESC LIMIT 5`;

    return request.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}

export async function fetchRecentPosts() {
  noStore();

  try {
    const request =
      await sql<IPost>`SELECT * FROM posts ORDER BY id DESC LIMIT 5`;

    return request.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}
