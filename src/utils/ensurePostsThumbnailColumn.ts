import { sql } from "@vercel/postgres";

/**
 * posts 테이블에 thumbnail_url 컬럼이 없으면 추가합니다.
 */
export async function ensurePostsThumbnailColumn(): Promise<void> {
  const { rows } = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'posts'
  `;
  const hasThumbnail = rows?.some((r) => r.column_name === "thumbnail_url") ?? false;
  if (!hasThumbnail) {
    await sql`
      ALTER TABLE posts ADD COLUMN thumbnail_url TEXT DEFAULT NULL
    `;
  }
}
