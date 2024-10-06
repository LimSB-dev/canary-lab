import type { Metadata, ResolvingMetadata } from "next";
import styles from "./page.module.scss";
import PostContent from "@/components/posts/[id]/PostContent";
import { getPost, incrementPostViews } from "@/app/api/posts";

type Props = {
  params: { index: number };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.index);
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
  const post = await getPost(params.index);
  return (
    <main id="main-page" role="main" className={styles.main}>
      <h1 className={styles.title}>{post.title}</h1>
      <PostContent post={post} />
    </main>
  );
}
