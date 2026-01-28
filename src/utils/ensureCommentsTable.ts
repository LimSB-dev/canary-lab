import { sql } from "@vercel/postgres";

/**
 * comments 테이블이 존재하는지 확인하고 없으면 생성합니다.
 */
export async function ensureCommentsTable(): Promise<void> {
  try {
    // 테이블 존재 여부 확인
    const { rows } = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'comments'
      )
    `;

    if (!rows[0]?.exists) {
      // 테이블 생성
      await sql`
        CREATE TABLE IF NOT EXISTS comments (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          deleted_at TIMESTAMP DEFAULT NULL
        )
      `;

      // 인덱스 생성
      await sql`
        CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id)
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id)
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at)
      `;

      console.log("Comments table created successfully");
    }
  } catch (error) {
    console.error("Error ensuring comments table:", error);
    // 테이블 생성 실패해도 계속 진행 (이미 존재할 수 있음)
  }
}
