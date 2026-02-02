"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth } from "@/auth";

/**
 * 태그를 수정합니다.
 * @param id 태그 id
 * @param name 태그 이름
 * @param color 태그 색상
 */
export async function putTag({ id, name, color }: { id: string; name: string; color: string }) {
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
  if (!name || !name.trim()) {
    throw new Error("태그 이름을 입력해주세요.");
  }
  if (!color || !color.trim()) {
    throw new Error("태그 색상을 입력해주세요.");
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
      UPDATE tags
      SET name = ${name.trim()}, color = ${color.trim()}
      WHERE id = ${id}
    `;

    revalidatePath("/posts");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(error instanceof Error ? error.message : "태그 수정 중 오류가 발생했습니다.");
  }
}
