"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";

async function fetchRecentPosts(size: number, offset: number): Promise<IPost[]> {
  const response = await fetch(
    `/api/posts/recent?size=${size}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

/**
 * 최근 게시글 캐러셀용 useQuery 훅.
 * - 캐시·재시도·placeholderData(이전 데이터 유지) 처리.
 * - fetchedForOffset: 현재 보여주는 데이터가 어떤 offset 기준인지 (캐러셀 슬라이드 시 1개만 스켈레톤 쓰기 위함).
 */
export function useRecentPosts(size: number, offset: number) {
  const lastFetchedOffsetRef = useRef<number | null>(null);

  const {
    data,
    isPending,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["recentPosts", size, offset],
    queryFn: () => fetchRecentPosts(size, offset),
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (!isPlaceholderData && data !== undefined) {
      lastFetchedOffsetRef.current = offset;
    }
  }, [offset, isPlaceholderData, data]);

  const recentPosts = data ?? [];
  const fetchedForOffset =
    isPlaceholderData && lastFetchedOffsetRef.current !== null
      ? lastFetchedOffsetRef.current
      : offset;

  return {
    recentPosts,
    isPending,
    isFetching,
    isPlaceholderData,
    fetchedForOffset,
  };
}
