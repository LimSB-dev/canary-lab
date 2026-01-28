"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { getComments, postComment, putComment, deleteComment } from "@/app/api/comments";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import styles from "./styles.module.scss";

interface CommentsProps {
  postIndex: number;
}

const COMMENTS_PER_PAGE = 5;

export const Comments = ({ postIndex }: CommentsProps) => {
  const user = useAppSelector((state) => state.user);
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadComments = useCallback(
    async (pageNum: number = 0, append: boolean = false) => {
      try {
        if (append) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }
        setError(null);

        const offset = pageNum * COMMENTS_PER_PAGE;
        const fetchedComments = await getComments(
          postIndex,
          COMMENTS_PER_PAGE,
          offset
        );

        if (append) {
          setComments((prev) => [...prev, ...fetchedComments]);
        } else {
          setComments(fetchedComments);
        }

        // 더 불러올 댓글이 있는지 확인
        setHasMore(fetchedComments.length === COMMENTS_PER_PAGE);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "댓글을 불러오는 중 오류가 발생했습니다."
        );
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [postIndex]
  );

  // Intersection Observer로 무한스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isLoading) {
          const nextPage = page + 1;
          setPage(nextPage);
          loadComments(nextPage, true);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, isLoading, page, loadComments]);

  // 초기 로드
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    loadComments(0, false);
  }, [loadComments]);

  const handleSubmit = async (content: string) => {
    try {
      const newComment = await postComment({ postIndex, content });
      // 최신 댓글이 맨 위에 오도록 맨 앞에 추가
      setComments((prev) => [newComment, ...prev]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "댓글 작성에 실패했습니다.");
    }
  };

  const handleEdit = async (commentId: string, content: string) => {
    try {
      await putComment({ commentId, content });
      // 수정된 댓글 업데이트
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, content, updatedAt: new Date().toISOString() }
            : comment
        )
      );
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
                {hasMore && (
                  <div ref={observerTarget} className={styles.loading_more}>
                    {isLoadingMore && "댓글을 불러오는 중..."}
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
