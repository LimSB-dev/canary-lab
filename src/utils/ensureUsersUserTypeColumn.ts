import { sql } from "@vercel/postgres";

/**
 * users 테이블에 user_type 컬럼이 없으면 추가합니다.
 * user_type: 'normal' | 'admin' (어드민 여부)
 */
export async function ensureUsersUserTypeColumn(): Promise<void> {
  try {
    const { rows } = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'users'
        AND column_name = 'user_type'
    `;
    const hasUserType = rows?.length > 0;
    if (!hasUserType) {
      await sql`
        ALTER TABLE users
        ADD COLUMN user_type VARCHAR(20) NOT NULL DEFAULT 'normal'
      `;
    }
  } catch (error) {
    console.error("ensureUsersUserTypeColumn:", error);
  }
}
