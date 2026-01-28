"use server";

import { sql } from "@vercel/postgres";
import camelcaseKeys from "camelcase-keys";
import { unstable_noStore as noStore } from "next/cache";

/**
 * 유저 데이터
 * 특정 email의 유저 데이터만 가져옵니다.
 */
export async function getUser(email: string): Promise<IUser | null> {
  noStore();

  if (!email || !email.trim()) {
    return null;
  }

  try {
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email.trim()}`;

    if (!rows[0]) {
      return null;
    }

    return camelcaseKeys(rows[0], { deep: true }) as IUser;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("사용자 정보를 불러오는 중 오류가 발생했습니다.");
  }
}
