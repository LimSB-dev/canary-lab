import { sql } from "@vercel/postgres";

/**
 * accounts 테이블: 한 사용자가 여러 OAuth 제공자로 로그인(연동)할 수 있도록 저장.
 * 연동 흐름에 맞춘 스키마:
 * - (provider, provider_account_id) UNIQUE → 동일 제공자 계정은 한 user_id에만 연동 (upsert 키)
 * - user_id 인덱스 → 사용자별 연동 목록 조회
 * - provider 인덱스 → 제공자별 필터/통계
 * - created_at → 연동 시각
 */
export async function ensureAccountsTable(): Promise<void> {
  try {
    const { rows } = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'accounts'
      )
    `;

    if (!rows[0]?.exists) {
      await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      await sql`
        CREATE TABLE accounts (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          provider VARCHAR(64) NOT NULL,
          provider_account_id TEXT NOT NULL,
          image TEXT DEFAULT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT uq_accounts_provider_provider_account_id UNIQUE (provider, provider_account_id)
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_accounts_provider ON accounts(provider)`;
    } else {
      await ensureAccountsTableMigrations();
    }
  } catch (error) {
    console.error("ensureAccountsTable error:", error);
    throw error;
  }
}

/** 기존 테이블에 연동 최적화용 컬럼/인덱스 추가 (마이그레이션) */
async function ensureAccountsTableMigrations(): Promise<void> {
  const { rows: cols } = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'accounts'
  `;
  const hasCreatedAt = cols?.some((r) => r.column_name === "created_at") ?? false;
  if (!hasCreatedAt) {
    await sql`
      ALTER TABLE accounts
      ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    `;
  }

  const hasImage = cols?.some((r) => r.column_name === "image") ?? false;
  if (!hasImage) {
    await sql`
      ALTER TABLE accounts ADD COLUMN image TEXT DEFAULT NULL
    `;
  }

  const { rows: idx } = await sql`
    SELECT indexname FROM pg_indexes
    WHERE schemaname = 'public' AND tablename = 'accounts'
  `;
  const hasProviderIdx = idx?.some((r) => r.indexname === "idx_accounts_provider") ?? false;
  if (!hasProviderIdx) {
    await sql`CREATE INDEX IF NOT EXISTS idx_accounts_provider ON accounts(provider)`;
  }
}
