"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys from "camelcase-keys";

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
