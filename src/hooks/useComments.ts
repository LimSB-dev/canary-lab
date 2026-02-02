"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComments, postComment, putComment, deleteComment } from "@/app/api/comments";
import { queryKeys } from "@/constants/queryKey";
import { COMMENTS_PER_PAGE } from "@/constants/pagination";

async function fetchCommentsPage(postIndex: number, pageParam: number): Promise<IComment[]> {
  const offset = pageParam * COMMENTS_PER_PAGE;
  return getComments(postIndex, COMMENTS_PER_PAGE, offset);
}

/**
 * 특정 게시글의 댓글 목록 (무한 스크롤).
 */
export function useComments(postIndex: number) {
  return useInfiniteQuery({
    queryKey: queryKeys.comments(postIndex),
    queryFn: ({ pageParam }) => fetchCommentsPage(postIndex, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < COMMENTS_PER_PAGE) return undefined;
      return allPages.length;
    },
  });
}

/**
 * 댓글 작성 mutation. 성공 시 해당 게시글 댓글 쿼리 무효화.
 */
export function usePostComment(postIndex: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => postComment({ postIndex, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments(postIndex) });
    },
  });
}

/**
 * 댓글 수정 mutation.
 */
export function usePutComment(postIndex: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: string; content: string }) =>
      putComment({ commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments(postIndex) });
    },
  });
}

/**
 * 댓글 삭제 mutation.
 */
export function useDeleteComment(postIndex: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments(postIndex) });
    },
  });
}
