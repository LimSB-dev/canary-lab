import styles from "./styles.module.scss";
import { PostListItem, SkeletonPostListItem } from "../postListItem";
import { fetchTags } from "@/lib/fetch/tags";
import { getPosts } from "@/app/api/posts";

export const PostsList = async () => {
  const posts = await getPosts();
  const tags = await fetchTags();

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
