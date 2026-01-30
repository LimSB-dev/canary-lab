"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * 게시물을 삭제 상태로 변경합니다.
 * @param index 게시물 index
 */
export async function deletePost(index: number) {
  noStore();

  // 인증 체크
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: 로그인이 필요합니다.");
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
      SET status = 'deleted', deleted_at = CURRENT_TIMESTAMP
      WHERE index = ${index}
    `;

    revalidatePath(`/posts/${index}`);
    revalidatePath("/posts");
    revalidatePath("/");
    redirect("/posts");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "게시물 삭제 중 오류가 발생했습니다."
    );
  }
}
