import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchPosts() {
  noStore();

  try {
    const posts = await sql<IPost>`SELECT * FROM posts`;

    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}

/**
 * 게시물의 ID를 이용하여 게시물을 가져옵니다.
 * @param id 게시물의 ID
 * @returns 게시물 데이터
 */
export async function fetchPostsById(id: string) {
  noStore();

  try {
    const post = await sql<IPost>`SELECT * FROM posts WHERE id = ${id}`;

    return post.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post data.");
  }
}

/**
 * 인기 게시물을 가져옵니다.
 * 인기 게시물은 조회수가 높은 순서로 정렬하여 가져옵니다.
 * @returns 인기 게시물 데이터
 */
export async function fetchPopularPosts() {
  noStore();

  try {
    const request =
      await sql<IPost>`SELECT * FROM posts ORDER BY views DESC LIMIT 5`;

    return request.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}

/**
 * 캐러셀에 표시할 최근 게시물을 가져옵니다.
 * 캐러셀에 표시할 게시글의 수는 size로 지정합니다.
 * @param size 캐러셀에 표시할 게시글의 수
 * @param offset 캐러셀에 표시할 게시글의 시작 위치
 * @returns
 */
export async function fetchRecentPosts(size: number, offset: number) {
  noStore();

  try {
    const request =
      await sql<IPost>`SELECT * FROM posts ORDER BY id DESC LIMIT ${size} OFFSET ${offset}`;

    return request.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}
