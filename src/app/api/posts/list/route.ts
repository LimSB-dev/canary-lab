import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import camelcaseKeys from "camelcase-keys";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = Math.max(Number(searchParams.get("limit")) || 20, 1);
  const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

  const tagIdsParam = searchParams.get("tagIds") || "";

  try {
    const hasTagFilter = tagIdsParam.trim().length > 0;

    const { rows } = hasTagFilter
      ? await sql`
          SELECT * FROM posts
          WHERE status = 'published'
            AND tags && string_to_array(${tagIdsParam}, ',')::text[]
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `
      : await sql`
          SELECT * FROM posts
          WHERE status = 'published'
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `;

    return NextResponse.json(camelcaseKeys(rows, { deep: true }));
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch posts data." }, { status: 500 });
  }
}
