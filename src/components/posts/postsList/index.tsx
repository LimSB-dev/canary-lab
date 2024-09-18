import { fetchPosts } from "@/lib/fetch/posts";
import styles from "./styles.module.scss";
import { PostListItem, SkeletonPostListItem } from "../postListItem";

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

export const SkeletonPostsList = () => {
  return (
    <ul className={styles.post_list}>
      {Array(10)
        .fill(0)
        .map((index) => (
          <SkeletonPostListItem key={index} />
        ))}
    </ul>
  );
};
