"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import camelcaseKeys from "camelcase-keys";

/**
 * 태그 데이터
 * index 칼럼을 기준으로 오름차순 정렬하여 최신 게시물부터 가져옵니다.
 */
export async function fetchTags(): Promise<ITag[]> {
  noStore();

  try {
    const { rows } = await sql`SELECT * FROM tags ORDER BY index ASC`; // 오름차순

    const tags = camelcaseKeys(rows, { deep: true }) as ITag[];
    return tags;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tags data.");
  }
}

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

/**
 * 태그를 수정합니다.
 * @param id 태그 id
 * @param name 태그 이름
 * @param color 태그 색상
 */
export async function putTag({
  id,
  name,
  color,
}: {
  id: string;
  name: string;
  color: string;
}) {
  noStore();

  await sql.query(
    `
    UPDATE tags
    SET name = $1, color = $2
    WHERE id = $3
    `,
    [name, color, id]
  );
}

/**
 * 태그를 삭제 상태로 변경합니다.
 * @param id 태그 ID
 */
export async function deleteTag(id: string) {
  noStore();

  const date = new Date().toISOString().split("T")[0];

  await sql.query(
    `
      DELETE tags
      WHERE id = $1
    `,
    [id]
  );
}
