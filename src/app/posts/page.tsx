import { META_DATA } from "@/constants/metadata";
import styles from "./page.module.scss";
import { Metadata } from "next";
import { PostsList } from "@/components/posts/postsList";

export const metadata: Metadata = {
  title: "Posts",
  description: META_DATA.APP_DESCRIPTION.POSTS,
};

export default function PostsPage() {
  return (
    <section id="main-page" role="main" className={styles.main}>
      <PostsList />
    </section>
  );
}
