"use client";

import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/app/api/posts";
import { queryKeys } from "@/constants/queryKey";

/**
 * 단일 게시글 조회 (편집 페이지 등).
 */
export function usePost(postIndex: number | undefined, options?: { enabled?: boolean }) {
  const enabled = options?.enabled ?? (!!postIndex && !Number.isNaN(postIndex));
  return useQuery({
    queryKey: queryKeys.posts.detail(postIndex!),
    queryFn: () => getPost(postIndex!),
    enabled,
  });
}
