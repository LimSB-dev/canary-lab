import { fetchPostsByIndex } from "@/lib/fetch/posts";
import styles from "./page.module.scss";
import type { Metadata } from "next";
import PostContent from "@/components/posts/[id]/PostContent";

export const metadata: Metadata = {
  title: "Posts Detail",
};

export default async function PostDetailPage({
  params,
}: {
  params: { index: string };
}) {
  const post = await fetchPostsByIndex(params.index);
  return (
    <main id="main-page" role="main" className={styles.main}>
      <h1 className={styles.title}>{post.title}</h1>
      <PostContent post={post} />
    </main>
  );
}
