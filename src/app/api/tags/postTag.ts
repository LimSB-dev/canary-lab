"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

/**
 * 태그를 생성합니다.
 * @param name 태그 이름
 * @param color 태그 색상
 */
export async function postTag({
  name,
  color,
}: {
  name: string;
  color: string;
}) {
  noStore();

  await sql`
      CREATE TABLE IF NOT EXISTS tags (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        index SERIAL,
        order SERIAL,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
      )
    `;

  await sql.query(
    `
      INSERT INTO tags (name, color)
      VALUES ($1, $2)
    `,
    [name, color]
  );
}
