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
    <div key={post.id} className={styles.content}>
      <MarkdownPreview
        className={styles.editor}
        source={post.content}
        style={{
          color: "inherit",
          background: "transparent",
        }}
      />
    </div>
  );
};

export default PostContent;
