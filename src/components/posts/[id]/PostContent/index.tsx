"use client";

import styles from "./styles.module.scss";
import dynamic from "next/dynamic";

interface IProps {
  post: IPost;
}

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

const PostContent = ({ post }: IProps) => {
  return (
    <div key={post.id} className={`${styles.content}`}>
      <MarkdownPreview source={post.content} />
    </div>
  );
};

export default PostContent;
