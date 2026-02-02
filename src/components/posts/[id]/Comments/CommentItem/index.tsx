"use client";

import { useState } from "react";
import Image from "next/image";
import { formatRelativeTime } from "@/utils/formatDate";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

// PostContent와 동일한 마크다운 프리뷰 사용
const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

interface CommentItemProps {
  comment: IComment;
  currentUserEmail: string | null;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
}

export const CommentItem = ({ comment, currentUserEmail, onEdit, onDelete }: CommentItemProps) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = currentUserEmail === comment.userEmail;
  const createdAt = new Date(comment.createdAt);
  const updatedAt = new Date(comment.updatedAt);
  const isEdited = updatedAt.getTime() > createdAt.getTime() + 1000; // 1초 이상 차이

  const handleEdit = async () => {
    if (!editContent.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onEdit(comment.id, editContent.trim());
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to edit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className={styles.comment_item}>
      <div className={styles.comment_header}>
        <div className={styles.comment_author}>
          <div className={styles.author_avatar}>
            {comment.userImage ? (
              <Image
                src={comment.userImage}
                alt={comment.userName || t("common.user")}
                width={32}
                height={32}
                className={styles.avatar_image}
                unoptimized
              />
            ) : (
              <div className={styles.avatar_placeholder}>
                {(comment.userName || comment.userEmail || "U")[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className={styles.author_info}>
            <strong className={styles.author_name}>{comment.userName || comment.userEmail}</strong>
            <span className={styles.comment_meta}>
              {formatRelativeTime(createdAt)}
              {isEdited && ` ${t("posts.editedLabel")}`}
            </span>
          </div>
        </div>
        {isOwner && !isEditing && (
          <div className={styles.comment_actions}>
            <button
              className={styles.action_button}
              onClick={() => setIsEditing(true)}
              aria-label={t("posts.editComment")}
            >
              {t("common.edit")}
            </button>
            <button
              className={`${styles.action_button} ${styles.delete_button}`}
              onClick={() => onDelete(comment.id)}
              aria-label={t("posts.deleteComment")}
            >
              {t("common.delete")}
            </button>
          </div>
        )}
      </div>

      <div className={styles.comment_body}>
        {isEditing ? (
          <div className={styles.edit_form}>
            <textarea
              className={styles.edit_textarea}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={4}
              disabled={isSubmitting}
            />
            <div className={styles.edit_actions}>
              <button
                className={styles.cancel_button}
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                {t("common.cancel")}
              </button>
              <button
                className={styles.save_button}
                onClick={handleEdit}
                disabled={!editContent.trim() || isSubmitting}
              >
                {isSubmitting ? t("common.loading") : t("common.save")}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.comment_content}>
            <MarkdownPreview
              source={comment.content}
              style={{
                color: "inherit",
                background: "transparent",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
