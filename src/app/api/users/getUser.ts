"use server";

import { sql } from "@vercel/postgres";
import camelcaseKeys from "camelcase-keys";
import { unstable_noStore as noStore } from "next/cache";

/**
 * 유저 데이터
 * 특정 email의 유저 데이터만 가져옵니다.
 */
export async function getUser(email: string): Promise<IUser> {
  noStore();

  try {
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;

    const camelCasedUser = camelcaseKeys(rows[0], { deep: true }) as IUser;
    return camelCasedUser;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user's data.");
  }
}
