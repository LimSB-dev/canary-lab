import type { Metadata, ResolvingMetadata } from "next";
import styles from "./page.module.scss";
import PostContent from "@/components/posts/[id]/PostContent";
import { getPost, getPrevNextPost } from "@/app/api/posts";
import PostNavigation from "@/components/posts/[id]/PostNavigation";
import { Comments } from "@/components/posts/[id]/Comments";
import { PostLikeButton } from "@/components/posts/[id]/PostLikeButton";
import ThumbnailGenerateButton from "@/components/posts/[id]/ThumbnailGenerateButton";
import { Suspense } from "react";
import { IncrementPostView } from "@/components/posts/[id]/IncrementPostView";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ index: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { index } = await params;
  const postIndex = Number(index);

  if (isNaN(postIndex)) {
    return {
      title: "게시물을 찾을 수 없습니다",
    };
  }

  try {
    const post = await getPost(postIndex);
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: post.title,
      openGraph: {
        images: ["/some-specific-page-image.jpg", ...previousImages],
      },
    };
  } catch {
    return {
      title: "게시물을 찾을 수 없습니다",
    };
  }
}

export default async function PostDetailPage({ params }: Props) {
  const { index } = await params;
  const postIndex = Number(index);

  if (isNaN(postIndex)) {
    notFound();
  }

  try {
    const post = await getPost(postIndex);
    const { previousPost, nextPost } = await getPrevNextPost(postIndex);

    return (
      <div className={styles.page_wrap}>
        <main id="main-page" role="main" className={styles.main}>
          <Suspense fallback={null}>
            <IncrementPostView postIndex={postIndex} />
          </Suspense>
          <h1 className={styles.title}>{post.title}</h1>
          <PostContent post={post} />
          <div className={styles.post_actions}>
            <ThumbnailGenerateButton postIndex={postIndex} />
            <PostLikeButton post={post} />
          </div>
          <PostNavigation previousPost={previousPost} nextPost={nextPost} />
          <Comments postIndex={postIndex} />
        </main>
      </div>
    );
  } catch (error) {
    console.error("Failed to load post:", error);
    notFound();
  }
}
