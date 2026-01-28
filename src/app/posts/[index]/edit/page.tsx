"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import styles from "./page.module.scss";

import { TOOLBARS, TOOLBARS_MODE } from "@/constants/editor/toolbars";
import { useDevice } from "@/hooks/useDevice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setMarkdownValue, setTitle } from "@/store/modules/post";
import AuthorizationComponents from "@/components/common/authorizationComponents";
import { getPost } from "@/app/api/posts";
import { useImageUpload } from "@/hooks/useImageUpload";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function PostEditPage() {
  const dispatch = useAppDispatch();
  const device = useDevice();
  const pathname = usePathname();
  const index = Number(pathname.split("/")[2]);
  const theme = useAppSelector((state) => state.theme.theme);
  const { title, markdownValue } = useAppSelector((state) => state.post);
  const { handleImageDrop } = useImageUpload();

  useEffect(() => {
    if (!index || isNaN(index)) {
      console.error("Invalid post index");
      return;
    }

    getPost(index)
      .then((data) => {
        dispatch(setTitle(data.title));
        dispatch(setMarkdownValue(data.content));
      })
      .catch((error) => {
        console.error("Failed to load post:", error);
      });
  }, [dispatch, index]);

  return (
    <main className={styles.main} data-color-mode={theme}>
      <AuthorizationComponents />
      <div className={styles.title}>
        <input
          className={styles.title_input}
          type="text"
          id="title"
          placeholder="제목을 입력하세요."
          onChange={(e) => dispatch(setTitle(e.target.value))}
          value={title}
        />
      </div>
      <MarkdownEditor
        className={styles.editor}
        value={markdownValue}
        onChange={(value) => dispatch(setMarkdownValue(value))}
        previewWidth={["laptop", "desktop"].includes(device) ? "50%" : "100%"}
        toolbars={TOOLBARS}
        toolbarsMode={TOOLBARS_MODE}
        height={"calc(100vh - 210px)"}
        previewProps={{
          className: styles.preview,
          style: { height: "100%" },
        }}
        onDrop={handleImageDrop}
      />
    </main>
  );
}
