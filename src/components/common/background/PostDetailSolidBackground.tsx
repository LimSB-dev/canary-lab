"use client";

import { usePathname } from "next/navigation";

/**
 * 게시글 상세(/posts/[index])일 때만 전체 뷰포트를 단색으로 덮어
 * 헤더·본문·푸터 뒤에 Color Bends가 보이지 않게 합니다.
 */
export function PostDetailSolidBackground() {
  const pathname = usePathname();

  const isPostDetail = pathname !== null && /^\/posts\/\d+$/.test(pathname);

  if (!isPostDetail) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
        backgroundColor: "var(--background-color)",
      }}
    />
  );
}
