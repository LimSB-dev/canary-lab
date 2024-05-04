import { fetchPosts } from "@/lib/fetch/posts";
import Link from "next/link";
import styles from "./styles.module.scss";
import { PostListItem } from "../postListItem";

export const PostsList = async () => {
  const posts = await fetchPosts();

  return (
    <ul className={styles.post_list}>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </ul>
  );
};
