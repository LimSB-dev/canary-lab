"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKey";
import { POSTS_LIST_PAGE_SIZE } from "@/constants/pagination";

async function fetchPostsList(pageParam: number, tagIds: string[]): Promise<IPost[]> {
  const offset = pageParam * POSTS_LIST_PAGE_SIZE;
  const qs = new URLSearchParams();
  qs.set("limit", String(POSTS_LIST_PAGE_SIZE));
  qs.set("offset", String(offset));
  if (tagIds.length) {
    qs.set("tagIds", tagIds.join(","));
  }
  const res = await fetch(`/api/posts/list?${qs.toString()}`);
  if (!res.ok) {
    throw new Error("게시글을 불러오지 못했습니다.");
  }
  return res.json() as Promise<IPost[]>;
}

/**
 * 게시글 목록 무한 스크롤용 useInfiniteQuery 훅.
 */
export function usePostsList(selectedTagIds: string[]) {
  const selectedKey = selectedTagIds.slice().sort().join(",");

  return useInfiniteQuery({
    queryKey: queryKeys.posts.list(selectedKey),
    queryFn: ({ pageParam }) => fetchPostsList(pageParam, selectedTagIds),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < POSTS_LIST_PAGE_SIZE) return undefined;
      return allPages.length;
    },
  });
}
