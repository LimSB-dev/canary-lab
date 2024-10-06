"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys from "camelcase-keys";

/**
 * 태그를 삭제 상태로 변경합니다.
 * @param id 태그 ID
 */
export async function deleteTag(id: string) {
  noStore();

  await sql.query(
    `
      DELETE tags
      WHERE id = $1
    `,
    [id]
  );
}
