"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys from "camelcase-keys";

/**
 * 게시물의 index를 이용하여 이전, 다음 게시물을 가져옵니다.
 * @param index 게시물의 index
 * @returns 이전, 현재, 다음 게시물 데이터
 */
export async function getPrevNextPost(index: number): Promise<{
  previousPost?: IPost;
  nextPost?: IPost;
}> {
  noStore();

  try {
    const [previousPost, nextPost] = await Promise.all([
      sql`SELECT * FROM posts WHERE index < ${index} AND status = 'published'  ORDER BY index DESC LIMIT 1`,
      sql`SELECT * FROM posts WHERE index > ${index} AND status = 'published'  ORDER BY index ASC LIMIT 1`,
    ]);

    return {
      previousPost: previousPost.rows[0]
        ? (camelcaseKeys(previousPost.rows[0], { deep: true }) as IPost)
        : undefined,
      nextPost: nextPost.rows[0]
        ? (camelcaseKeys(nextPost.rows[0], { deep: true }) as IPost)
        : undefined,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch adjacent post data.");
  }
}
