"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth } from "@/auth";

/**
 * 태그를 삭제합니다.
 * @param id 태그 ID
 */
export async function deleteTag(id: string) {
  noStore();

  // 인증 체크
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: 로그인이 필요합니다.");
  }

  // 입력 검증
  if (!id || !id.trim()) {
    throw new Error("태그 ID가 필요합니다.");
  }

  try {
    // 태그 존재 여부 확인
    const { rows: existingTag } = await sql`
      SELECT id FROM tags WHERE id = ${id}
    `;

    if (!existingTag[0]) {
      throw new Error("태그를 찾을 수 없습니다.");
    }

    await sql`
      DELETE FROM tags
      WHERE id = ${id}
    `;

    revalidatePath("/posts");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "태그 삭제 중 오류가 발생했습니다."
    );
  }
}
