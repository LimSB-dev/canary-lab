import { fetchPosts } from "@/lib/fetch/posts";
import Link from "next/link";

export const PostsList = async () => {
  const posts = await fetchPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};
