import { useCallback, useRef, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import { isEmpty } from "lodash";
import { useAppDispatch, useAppSelector } from "./reduxHook";
import { setMarkdownValue } from "@/store/modules/post";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * 이미지 업로드를 처리하는 커스텀 훅
 */
export function useImageUpload() {
  const dispatch = useAppDispatch();
  const markdownValueRef = useRef<string>("");
  const markdownValue = useAppSelector((state) => state.post.markdownValue);

  // markdownValue를 ref에 동기화하여 최신 값 유지
  useEffect(() => {
    markdownValueRef.current = markdownValue;
  }, [markdownValue]);

  const handleImageDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();

      const files = Array.from(e.dataTransfer.files);
      const overSizeFiles = files
        .filter((file) => file.size > MAX_FILE_SIZE)
        .map((file) => file.name);

      if (!isEmpty(overSizeFiles)) {
        alert(
          `10MB 이하의 파일만 업로드 가능합니다.\n${overSizeFiles.join(", ")}`
        );
        return;
      }

      // 파일 업로드 처리
      const uploadPromises = files.map(async (file) => {
        try {
          const newBlob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/image/upload",
          });

          // 이미지 URL을 마크다운에 추가 (ref를 통해 최신 값 사용)
          const imageMarkdown = `\n![${file.name}](${newBlob.url})\n`;
          const currentValue = markdownValueRef.current;
          dispatch(setMarkdownValue(`${currentValue}${imageMarkdown}`));
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
          alert(`이미지 업로드에 실패했습니다: ${file.name}`);
        }
      });

      await Promise.all(uploadPromises);
    },
    [dispatch]
  );

  return { handleImageDrop };
}
