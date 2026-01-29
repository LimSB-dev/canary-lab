"use client";

import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import { useDevice } from "@/hooks/useDevice";
import { TOOLBARS, TOOLBARS_MODE } from "@/constants/editor/toolbars";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setMarkdownValue, setTitle } from "@/store/modules/post";
import AuthorizationComponents from "@/components/common/authorizationComponents";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useTranslation } from "@/hooks/useTranslation";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function CreatePage() {
  const { t } = useTranslation();
  const device = useDevice();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { title, markdownValue } = useAppSelector((state) => state.post);
  const { handleImageDrop } = useImageUpload();

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
      </div>
      <MarkdownEditor
        className={styles.editor}
        value={markdownValue}
        onChange={(value) => dispatch(setMarkdownValue(value))}
        previewWidth={["laptop", "desktop"].includes(device) ? "50%" : "100%"}
        toolbars={TOOLBARS}
        toolbarsMode={TOOLBARS_MODE}
        height={"calc(100vh - 240px)"}
        previewProps={{
          className: styles.preview,
          style: { height: "100%" },
        }}
        onDrop={handleImageDrop}
      />
    </main>
  );
}
