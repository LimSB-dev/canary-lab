"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth } from "@/auth";

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

  // 인증 체크
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: 로그인이 필요합니다.");
  }

  // 입력 검증
  if (!name || !name.trim()) {
    throw new Error("태그 이름을 입력해주세요.");
  }
  if (!color || !color.trim()) {
    throw new Error("태그 색상을 입력해주세요.");
  }

  try {
    const { rows } = await sql`
      INSERT INTO tags (name, color)
      VALUES (${name.trim()}, ${color.trim()})
      RETURNING *
    `;

    if (!rows[0]) {
      throw new Error("태그 생성에 실패했습니다.");
    }

    revalidatePath("/posts");

    return rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "태그 생성 중 오류가 발생했습니다."
    );
  }
}
