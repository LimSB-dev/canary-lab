"use client";

import { useEffect } from "react";
import { incrementPostViews } from "@/app/api/posts";

type Props = {
  postIndex: number;
};

/**
 * 마운트 시 조회수 증가 + revalidate를 Server Action으로 호출합니다.
 * (렌더 중이 아닌 클라이언트 요청 컨텍스트에서 실행되므로 revalidatePath 사용 가능)
 */
export function IncrementPostView({ postIndex }: Props) {
  useEffect(() => {
    incrementPostViews(postIndex);
  }, [postIndex]);

  return null;
}
