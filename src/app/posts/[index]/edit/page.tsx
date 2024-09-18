"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { upload } from "@vercel/blob/client";
import { useEffect } from "react";
import styles from "./page.module.scss";
import { isEmpty } from "lodash";

import { TOOLBARS, TOOLBARS_MODE } from "@/constants/editor/toolbars";
import { useDevice } from "@/hooks/useDevice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setMarkdownValue, setTitle } from "@/store/modules/post";
import { fetchPostsByIndex, putPost } from "@/lib/fetch/posts";
import AuthorizationComponents from "@/components/common/authorizationComponents";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function PostEditPage() {
  const dispatch = useAppDispatch();
  const device = useDevice();
  const index = usePathname().split("/")[2];
  const theme = useAppSelector((state) => state.theme.theme);
  const { title, markdownValue } = useAppSelector((state) => state.post);

  useEffect(() => {
    fetchPostsByIndex(index).then((data) => {
      dispatch(setTitle(data.title));
      dispatch(setMarkdownValue(data.content));
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
        onDrop={(e) => {
          e.preventDefault();
          const limitSize = 10 * 1024 * 1024;
          const files = Array.from(e.dataTransfer.files);
          const overSizeFiles = files
            .filter((file) => file.size > limitSize)
            .map((file) => file.name);

          if (!isEmpty(overSizeFiles)) {
            alert(
              `10MB 이하의 파일만 업로드 가능합니다.\n${overSizeFiles.join(
                ", "
              )}`
            );
            return;
          }

          files.forEach(async (file) => {
            const newBlob = await upload(file.name, file, {
              access: "public",
              handleUploadUrl: "/api/image/upload",
            }).then((res) => {
              console.log(res);
              return res;
            });

            // image url을 markdown에 추가
            dispatch(
              setMarkdownValue(
                `${markdownValue}
![${file.name}](${newBlob.url})
`
              )
            );
          });
        }}
      />
    </main>
  );
}
