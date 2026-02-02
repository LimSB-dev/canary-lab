"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTags, postTag, putTag, deleteTag } from "@/app/api/tags";
import { queryKeys } from "@/constants/queryKey";

export function useTags(options?: { enabled?: boolean }) {
  const { enabled = true } = options ?? {};
  return useQuery({
    queryKey: queryKeys.tags,
    queryFn: () => getTags(),
    enabled,
  });
}

export function useTagMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: queryKeys.tags });

  const createTag = useMutation({
    mutationFn: (params: { name: string; color: string }) =>
      postTag({ name: params.name.trim(), color: params.color }),
    onSuccess: invalidate,
  });
  const updateTag = useMutation({
    mutationFn: (params: { id: string; name: string; color: string }) =>
      putTag({ id: params.id, name: params.name.trim(), color: params.color }),
    onSuccess: invalidate,
  });
  const removeTag = useMutation({
    mutationFn: (id: string) => deleteTag(id),
    onSuccess: invalidate,
  });

  return { createTag, updateTag, removeTag };
}
