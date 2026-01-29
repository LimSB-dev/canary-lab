"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

import { TOOLBARS, TOOLBARS_MODE } from "@/constants/editor/toolbars";
import { useDevice } from "@/hooks/useDevice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setMarkdownValue, setTitle } from "@/store/modules/post";
import AuthorizationComponents from "@/components/common/authorizationComponents";
import { usePost } from "@/hooks/usePost";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useTranslation } from "@/hooks/useTranslation";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { generatePostThumbnail } from "@/app/api/posts/generateThumbnail";
import GenerateMarkdownFromPrompt from "@/components/posts/GenerateMarkdownFromPrompt";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function PostEditPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const device = useDevice();
  const pathname = usePathname();
  const index = Number(pathname.split("/")[2]);
  const theme = useAppSelector((state) => state.theme.theme);
  const { title, markdownValue } = useAppSelector((state) => state.post);
  const { handleImageDrop } = useImageUpload();
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const { data: post } = usePost(index);

  useEffect(() => {
    if (!post) return;
    dispatch(setTitle(post.title));
    dispatch(setMarkdownValue(post.content));
  }, [post, dispatch]);

  const handleGenerateThumbnail = async () => {
    if (thumbnailLoading || !index) return;
    setThumbnailLoading(true);
    try {
      await generatePostThumbnail(index);
      await queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(index) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.posts.list("") });
      alert(t("posts.generateThumbnailSuccess"));
    } catch (err) {
      alert(err instanceof Error ? err.message : t("posts.generateThumbnailError"));
    } finally {
      setThumbnailLoading(false);
    }
  };

  return (
    <main className={styles.main} data-color-mode={theme}>
      <AuthorizationComponents />
      <div className={styles.title}>
        <input
          className={styles.title_input}
          type="text"
          id="title"
          placeholder={t("posts.titlePlaceholder")}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          value={title}
        />
        <GenerateMarkdownFromPrompt />
        {post && (
          <button
            type="button"
            className={styles.thumbnail_button}
            onClick={handleGenerateThumbnail}
            disabled={thumbnailLoading}
          >
            {thumbnailLoading ? t("posts.generateThumbnailLoading") : t("posts.generateThumbnail")}
          </button>
        )}
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
