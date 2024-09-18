import { fetchPostsByIndex, incrementPostViews } from "@/lib/fetch/posts";
import styles from "./page.module.scss";
import type { Metadata } from "next";
import PostContent from "@/components/posts/[id]/PostContent";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Posts Detail",
};

const SkeletonPostDetail = () => {
  return (
    <>
      <h1 className={styles.title}>Now Loading...</h1>
      <p>Please wait a moment</p>
    </>
  );
};

export default async function PostDetailPage({
  params,
}: {
  params: { index: string };
}) {
  await incrementPostViews(params.index);
  const post = await fetchPostsByIndex(params.index);
  return (
    <main id="main-page" role="main" className={styles.main}>
      <Suspense fallback={<SkeletonPostDetail />}>
        <h1 className={styles.title}>{post.title}</h1>
        <PostContent post={post} />
      </Suspense>
    </main>
  );
}
