"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { OutputData } from "@editorjs/editorjs";
import CreatePostForm from "@/components/create/form/CreatePostForm";
import { PreviewRenderer } from "@/components/common/editor";

export default function CreatePage() {
  const [post, setPost] = useState<OutputData>({
    time: 0,
    blocks: [],
    version: "2.29.0",
  });

  return (
    <main className={styles.main}>
      {/* <CreatePostForm post={post} setPost={setPost} /> */}
      {/* <PreviewRenderer post={post} /> */}
    </main>
  );
}
