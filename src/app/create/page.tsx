"use client";

import CreatePostForm from "@/components/create/form/CreatePostForm";
import styles from "./page.module.scss";
import { PreviewRenderer } from "@/components/common/editor";
import { useState } from "react";
import { OutputData } from "@editorjs/editorjs";

export default function Create() {
  const [post, setPost] = useState<OutputData>({
    time: 0,
    blocks: [],
    version: "2.29.0",
  });

  return (
    <main className={styles.main}>
      <CreatePostForm post={post} setPost={setPost} />
      <PreviewRenderer post={post} />
    </main>
  );
}
