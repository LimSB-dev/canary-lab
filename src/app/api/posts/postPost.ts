"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import camelcaseKeys from "camelcase-keys";
import { auth } from "@/auth";

/**
 * 게시물을 생성합니다.
 * @param title 게시물 제목
 * @param markdownValue 게시물 내용
 */
export async function postPost({
  title,
  markdownValue,
}: {
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
    const { rows } = await sql`
      INSERT INTO posts (title, content)
      VALUES (${title.trim()}, ${markdownValue.trim()})
      RETURNING index
    `;

    if (!rows[0]?.index) {
      throw new Error("게시물 생성에 실패했습니다.");
    }

    const postIndex = rows[0].index;
    revalidatePath(`/posts/${postIndex}`);
    revalidatePath("/posts");
    revalidatePath("/");
    redirect(`/posts/${postIndex}`);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "게시물 생성 중 오류가 발생했습니다."
    );
  }
}
