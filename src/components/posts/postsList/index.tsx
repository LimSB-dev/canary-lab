import styles from "./styles.module.scss";
import { PostListItem, SkeletonPostListItem } from "@/components/posts/postListItem";

import { getPosts } from "@/app/api/posts";
import { getTags } from "@/app/api/tags";

export default async function PostsList() {
  const posts = await getPosts();
  const tags = await getTags();

  return (
    <ul className={styles.post_list}>
      {posts ? (
        posts.map((post) => (
          <PostListItem key={post.id} post={post} tags={tags} />
        ))
      ) : (
        <>none</>
      )}
    </ul>
  );
}

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
