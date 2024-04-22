import { fetchPosts } from "@/lib/fetch/posts";

export const PostsList = async () => {
  const posts = await fetchPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
