import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPosts,
  getPost,
  postPost,
  putPost,
  deletePost,
} from "app/api/posts";
import { QUERY } from "constants/queryKey";

/**
 * 모든 게시물 데이터
 */
export const usePosts = () => {
  return useQuery<IPost[], Error>({
    queryKey: [QUERY.GET_POSTS.key],
    queryFn: () => getPosts(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

/**
 * 게시물 상세 데이터
 * @params id: 게시글 아이디
 */
export const usePost = (index: number) => {
  return useQuery({
    queryKey: QUERY.GET_POST(index).key,
    queryFn: () => getPost(index),
    enabled: !!index,
  });
};

/**
 * 게시글 생성
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPost,
    onSuccess: (createdPost) => {
      queryClient.invalidateQueries({
        queryKey: QUERY.GET_POST(createdPost.index).key,
      });
    },
  });
};

/**
 * 게시물 수정
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putPost,
    onSuccess: (index) => {
      queryClient.invalidateQueries({
        queryKey: QUERY.GET_POST(index).key,
      });
    },
  });
};

/**
 * 게시물 삭제
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY.GET_POSTS.key,
      });
    },
  });
};
