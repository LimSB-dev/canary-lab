"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * 게시물을 수정합니다.
 * @param index 게시물 index
 * @param title 게시물 제목
 * @param markdownValue 게시물 내용
 */
export async function putPost({
  index,
  title,
  markdownValue,
}: {
  index: number;
  title: string;
  markdownValue: string;
}) {
  noStore();

  // 인증 체크
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: 로그인이 필요합니다.");
  }

  // 입력 검증
  if (!title || !title.trim()) {
    throw new Error("제목을 입력해주세요.");
  }
  if (!markdownValue || !markdownValue.trim()) {
    throw new Error("내용을 입력해주세요.");
  }

  try {
    // 게시물 존재 여부 확인
    const { rows: existingPost } = await sql`
      SELECT id FROM posts WHERE index = ${index} AND status != 'deleted'
    `;

    if (!existingPost[0]) {
      throw new Error("게시물을 찾을 수 없습니다.");
    }

    await sql`
      UPDATE posts
      SET title = ${title.trim()}, content = ${markdownValue.trim()}, updated_at = CURRENT_TIMESTAMP
      WHERE index = ${index}
    `;

    revalidatePath(`/posts/${index}`);
    revalidatePath("/posts");
    revalidatePath("/");
    redirect(`/posts/${index}`);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(error instanceof Error ? error.message : "게시물 수정 중 오류가 발생했습니다.");
  }
}
