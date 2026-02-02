import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import camelcaseKeys from "camelcase-keys";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postsLimit = Math.max(Number(searchParams.get("size")) || 4, 1); // Ensure postsLimit is at least 1
  let postsOffset = Number(searchParams.get("offset")) || 0;

  try {
    const { rows: totalPostsCountRows } =
      await sql`SELECT COUNT(*) FROM posts WHERE status = 'published'`;
    const totalPostsCount = parseInt(totalPostsCountRows[0].count, 10);

    if (postsOffset < 0) {
      postsOffset = Math.max(totalPostsCount + postsOffset, 0);
    } else if (postsOffset >= totalPostsCount) {
      postsOffset = postsOffset % totalPostsCount;
    }

    const { rows: postsRows } = await sql`
      SELECT * FROM posts 
      WHERE status = 'published' 
      ORDER BY created_at DESC 
      LIMIT ${postsLimit} OFFSET ${postsOffset}
    `;

    const latestPostsCount = Math.min(postsLimit, totalPostsCount);
    const { rows: latestPosts } = await sql`
      SELECT * FROM posts 
      WHERE status = 'published' 
      ORDER BY created_at DESC 
      LIMIT ${latestPostsCount}
    `;

    const combinedPosts = [...postsRows, ...latestPosts].slice(0, postsLimit);

    return NextResponse.json(camelcaseKeys(combinedPosts, { deep: true }));
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch recent posts data." }, { status: 500 });
  }
}
