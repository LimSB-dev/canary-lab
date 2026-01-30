import { sql } from "@vercel/postgres";

/**
 * 기존 user(previousUserId)의 댓글·좋아요를 현재 user(currentUserId)로 옮기고 기존 user 삭제.
 * 연동 추가 시 이미 해당 제공자 계정이 다른 user에 연결돼 있을 때 호출.
 */
export async function mergeUserIntoUser(
  previousUserId: string,
  currentUserId: string
): Promise<void> {
  if (previousUserId === currentUserId) return;

  await sql`
    UPDATE comments
    SET user_id = ${currentUserId}
    WHERE user_id = ${previousUserId}
  `;

  await sql`
    UPDATE posts
    SET likes = (
      array_remove(likes, ${previousUserId}::uuid)
      || CASE
        WHEN NOT (${currentUserId}::uuid = ANY(array_remove(likes, ${previousUserId}::uuid)))
        THEN ARRAY[${currentUserId}::uuid]
        ELSE '{}'::uuid[]
      END
    )
    WHERE ${previousUserId}::uuid = ANY(likes)
  `;

  await sql`DELETE FROM users WHERE id = ${previousUserId}`;
}
