"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

/**
 * 로그인한 사용자의 프로필 이미지 URL을 DB에 저장합니다.
 */
export async function updateUserImage(email: string, imageUrl: string): Promise<void> {
  if (!email?.trim() || !imageUrl?.trim()) return;
  await sql`
    UPDATE users SET image = ${imageUrl.trim()} WHERE email = ${email.trim()}
  `;
  revalidatePath("/mypage");
  revalidatePath("/");
}
