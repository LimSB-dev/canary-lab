import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();

  try {
    const request = await sql<IPost>`SELECT * FROM posts
    ORDER BY views DESC`;

    return request.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}
