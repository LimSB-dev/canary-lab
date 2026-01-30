"use client";

import { useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";
import {
  useComments,
  usePostComment,
  usePutComment,
  useDeleteComment,
} from "@/hooks/useComments";

interface CommentsProps {
  postIndex: number;
}

export const Comments = ({ postIndex }: CommentsProps) => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    isPending: isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useComments(postIndex);

  const postCommentMutation = usePostComment(postIndex);
  const putCommentMutation = usePutComment(postIndex);
  const deleteCommentMutation = useDeleteComment(postIndex);

  const comments = data?.pages.flat() ?? [];

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        if (isFetchingNextPage || !hasNextPage) return;
        fetchNextPage();
      },
      { threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSubmit = async (content: string) => {
    try {
      await postCommentMutation.mutateAsync(content);
    } catch (err) {
      alert(err instanceof Error ? err.message : t("posts.errorPostComment"));
    }
  };

  const handleEdit = async (commentId: string, content: string) => {
    try {
      await putCommentMutation.mutateAsync({ commentId, content });
    } catch (err) {
      alert(err instanceof Error ? err.message : t("posts.errorEditComment"));
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm(t("posts.confirmDeleteComment"))) return;
    try {
      await deleteCommentMutation.mutateAsync(commentId);
    } catch (err) {
      alert(err instanceof Error ? err.message : t("posts.errorDeleteComment"));
    }
  };

  const errorMessage = isError
    ? error instanceof Error
      ? error.message
      : t("posts.errorFetchComments")
    : null;

  return (
    <section className={styles.comments_section}>
      <h2 className={styles.comments_title}>
        {comments.length > 0
          ? t("posts.commentsCount").replace("{{count}}", String(comments.length))
          : t("posts.comments")}
      </h2>

      {isLoading ? (
        <div className={styles.loading}>{t("posts.loadingComments")}</div>
      ) : errorMessage ? (
        <div className={styles.error}>{errorMessage}</div>
      ) : (
        <>
          <CommentForm onSubmit={handleSubmit} isAuthenticated={!!user.email} />
          <div className={styles.comments_list}>
            {comments.length === 0 ? (
              <div className={styles.empty_state}>
                {t("posts.noCommentsYet")}
              </div>
            ) : (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    currentUserEmail={user.email}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
                {hasNextPage && (
                  <div ref={observerTarget} className={styles.loading_more}>
                    {isFetchingNextPage && t("posts.loadingComments")}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};
