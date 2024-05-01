import { fetchPosts } from "@/lib/fetch/posts";
import Link from "next/link";
import styles from "./styles.module.scss";

export const PostsList = async () => {
  const posts = await fetchPosts();

  return (
    <ul className={styles.post_list}>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`} passHref>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
