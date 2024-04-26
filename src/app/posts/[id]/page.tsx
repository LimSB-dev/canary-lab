import { fetchPostsById } from "@/lib/fetch/posts";
import styles from "./page.module.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts Detail",
};

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const post = await fetchPostsById(params.id);
  return (
    <main id="main-page" role="main" className={styles.main}>
      <h1>{post.title}</h1>
      <p>{post.status}</p>
      <div className="border rounded-md"></div>
    </main>
  );
}
