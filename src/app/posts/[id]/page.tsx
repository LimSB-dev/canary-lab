import { fetchPostsById } from "@/lib/fetch/posts";
import styles from "./page.module.scss";
import type { Metadata } from "next";
import { PreviewRenderer } from "@/components/common/editor";
import PostContent from "@/components/posts/[id]/PostContent";

export const metadata: Metadata = {
  title: "Posts Detail",
};

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await fetchPostsById(params.id);
  return (
    <main id="main-page" role="main" className={styles.main}>
      <h1>{post.title}</h1>
      <PostContent post={post} />
      <div className="border rounded-md"></div>
    </main>
  );
}
