import type { Metadata, ResolvingMetadata } from "next";
import { fetchPostsByIndex, incrementPostViews } from "@/lib/fetch/posts";
import styles from "./page.module.scss";
import PostContent from "@/components/posts/[id]/PostContent";

type Props = {
  params: { index: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await fetchPostsByIndex(params.index);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

export default async function PostDetailPage({ params }: Props) {
  await incrementPostViews(params.index);
  const post = await fetchPostsByIndex(params.index);
  return (
    <main id="main-page" role="main" className={styles.main}>
      <h1 className={styles.title}>{post.title}</h1>
      <PostContent post={post} />
    </main>
  );
}
