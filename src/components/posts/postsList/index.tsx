import { fetchPosts } from "@/lib/data";
import React from "react";

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
