import { PostData } from "@/types/post";
import { sql } from "@vercel/postgres";
import { User } from "next-auth";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchPosts() {
  noStore();

  try {
    const posts = await sql<PostData>`SELECT * FROM posts`;

    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}
