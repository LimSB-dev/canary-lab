import { META_DATA } from "@/constants/metadata";
import styles from "./page.module.scss";
import { Metadata } from "next";
import { PostsList, SkeletonPostsList } from "@/components/posts/postsList";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Posts",
  description: META_DATA.APP_DESCRIPTION.POSTS,
};

export default function PostsPage() {
  return (
    <section id="main-page" role="main" className={styles.main}>
      <Suspense fallback={<SkeletonPostsList />}>
        <PostsList />
      </Suspense>
    </section>
  );
}
