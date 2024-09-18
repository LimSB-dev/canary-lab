"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * 게시물 데이터
 * status가 published인 게시물만 가져옵니다.
 * created_at 칼럼을 기준으로 내림차순 정렬하여 최신 게시물부터 가져옵니다.
 */
export async function fetchPosts() {
  noStore();

  try {
    const posts =
      await sql<IPost>`SELECT * FROM posts WHERE status = 'published' ORDER BY created_at DESC`; // 내림차순 정렬

    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}

/**
 * 게시물의 index를 이용하여 게시물을 가져옵니다.
 * @param index 게시물의 index
 * @returns 게시물 데이터
 */
export async function fetchPostsByIndex(index: string) {
  noStore();

  try {
    const post = await sql<IPost>`SELECT * FROM posts WHERE index = ${index}`;

    return post.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post data by index.");
  }
}

/**
 * 인기 게시물을 가져옵니다.
 * 인기 게시물은 조회수가 높은 순서로 정렬하여 가져옵니다.
 * status가 published인 게시물만 가져옵니다.
 * @returns 인기 게시물 데이터
 */
export async function fetchPopularPosts() {
  noStore();

  try {
    const request =
      await sql<IPost>`SELECT * FROM posts WHERE status = 'published' ORDER BY views DESC LIMIT 5`;

    return request.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch popular posts data.");
  }
}

/**
 * 캐러셀에 표시할 최근 게시물을 가져옵니다.
 * 캐러셀에 표시할 게시글의 수는 size로 지정합니다.
 * status가 published인 게시물만 가져옵니다.
 * @param size 캐러셀에 표시할 게시글의 수
 * @param offset 캐러셀에 표시할 게시글의 시작 위치
 * @returns
 */
export async function fetchRecentPosts(size: number, offset: number) {
  noStore();

  try {
    const request =
      await sql<IPost>`SELECT * FROM posts WHERE status = 'published' ORDER BY created_at DESC LIMIT ${size} OFFSET ${offset}`;

    return request.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recent posts data.");
  }
}

/**
 * 게시물을 생성합니다.
 * @param title 게시물 제목
 * @param markdownValue 게시물 내용
 */
export async function postPost({
  title,
  markdownValue,
}: {
  title: string;
  markdownValue: string;
}) {
  noStore();

  await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        index SERIAL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}',
        comments UUID[] DEFAULT '{}',
        created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at DATE DEFAULT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        likes INT DEFAULT 0,
        views INT DEFAULT 0
      )
    `;

  await sql.query(
    `
      INSERT INTO posts (title, content)
      VALUES ($1, $2)
    `,
    [title, markdownValue]
  );

  const request =
    await sql<IPost>`SELECT index FROM posts ORDER BY index DESC LIMIT 1`;

  revalidatePath(`/posts/${request.rows[0].index}`);
  redirect(`/posts/${request.rows[0].index}`);
}

/**
 * 게시물을 수정합니다.
 * @param index 게시물 index
 * @param title 게시물 제목
 * @param markdownValue 게시물 내용
 */
export async function putPost({
  index,
  title,
  markdownValue,
}: {
  index: string;
  title: string;
  markdownValue: string;
}) {
  noStore();

  await sql.query(
    `
    UPDATE posts
    SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP
    WHERE index = $3
    `,
    [title, markdownValue, index]
  );

  revalidatePath(`/posts/${index}`);
  redirect(`/posts/${index}`);
}

/**
 * 게시물을 삭제 상태로 변경합니다.
 * @param id 게시물 ID
 */
export async function deletePost(index: string) {
  noStore();

  const date = new Date().toISOString().split("T")[0];

  await sql.query(
    `
      UPDATE posts
      SET status = 'deleted', deleted_at = $1
      WHERE index = $2
    `,
    [date, index]
  );

  revalidatePath(`/posts/${index}`);
  redirect("/posts");
}

/**
 * 게시물의 조회수를 증가시킵니다.
 * @param index 게시물의 index
 */
export async function incrementPostViews(index: string) {
  noStore();

  try {
    await sql.query(
      `
      UPDATE posts
      SET views = views + 1
      WHERE index = $1
      `,
      [index]
    );

    // Optionally, revalidate the path if you want to refresh the page after incrementing views
    revalidatePath(`/posts/${index}`);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to increment post views.");
  }
}
