"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { getComments, postComment, putComment, deleteComment } from "@/app/api/comments";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import styles from "./styles.module.scss";

interface CommentsProps {
  postIndex: number;
}

export const Comments = ({ postIndex }: CommentsProps) => {
  const user = useAppSelector((state) => state.user);
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedComments = await getComments(postIndex);
      setComments(fetchedComments);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "댓글을 불러오는 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postIndex]);

  const handleSubmit = async (content: string) => {
    try {
      const newComment = await postComment({ postIndex, content });
      setComments((prev) => [...prev, newComment]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "댓글 작성에 실패했습니다.");
    }
  };

  const handleEdit = async (commentId: string, content: string) => {
    try {
      await putComment({ commentId, content });
      await loadComments();
    } catch (err) {
      alert(err instanceof Error ? err.message : "댓글 수정에 실패했습니다.");
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "댓글 삭제에 실패했습니다.");
    }
  };

  return (
    <section className={styles.comments_section}>
      <h2 className={styles.comments_title}>
        {comments.length > 0 ? `${comments.length}개의 댓글` : "댓글"}
      </h2>

      {isLoading ? (
        <div className={styles.loading}>댓글을 불러오는 중...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <>
          <CommentForm onSubmit={handleSubmit} isAuthenticated={!!user.email} />
          <div className={styles.comments_list}>
            {comments.length === 0 ? (
              <div className={styles.empty_state}>
                아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
              </div>
            ) : (
              comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  currentUserEmail={user.email}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
};
