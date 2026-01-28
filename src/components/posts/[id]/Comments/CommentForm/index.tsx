"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAppSelector } from "@/hooks/reduxHook";
import styles from "./styles.module.scss";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isAuthenticated: boolean;
}

export const CommentForm = ({ onSubmit, isAuthenticated }: CommentFormProps) => {
  const user = useAppSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // textarea 자동 높이 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim());
      setContent("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.login_prompt}>
        <p>댓글을 작성하려면 로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <form className={styles.comment_form} onSubmit={handleSubmit}>
      <div className={styles.comment_form_header}>
        <div className={styles.user_avatar}>
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={40}
              height={40}
              className={styles.avatar_image}
            />
          ) : (
            <div className={styles.avatar_placeholder}>
              {(user.name || user.email || "U")[0].toUpperCase()}
            </div>
          )}
        </div>
        <div className={styles.comment_input_wrapper}>
          <textarea
            ref={textareaRef}
            className={styles.comment_textarea}
            placeholder="댓글을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            disabled={isSubmitting}
          />
          <div className={styles.comment_form_footer}>
            <button
              type="submit"
              className={styles.submit_button}
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? "작성 중..." : "댓글 작성"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
