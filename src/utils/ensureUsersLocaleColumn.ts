import { sql } from "@vercel/postgres";

/**
 * users 테이블에 locale 컬럼이 없으면 추가합니다.
 * locale: 저장된 언어 설정 (예: 'ko', 'en') — 로그인 사용자 언어 동기화용
 */
export async function ensureUsersLocaleColumn(): Promise<void> {
  try {
    const { rows } = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'users'
        AND column_name = 'locale'
    `;
    const hasLocale = rows?.length > 0;
    if (!hasLocale) {
      await sql`
        ALTER TABLE users
        ADD COLUMN locale VARCHAR(10) NOT NULL DEFAULT 'ko'
      `;
    }
  } catch (error) {
    console.error("ensureUsersLocaleColumn:", error);
  }
}
