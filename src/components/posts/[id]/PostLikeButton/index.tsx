"use client";

import { useState, useTransition } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { togglePostLike } from "@/app/api/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

interface PostLikeButtonProps {
  post: IPost;
  onLikeToggle?: (isLiked: boolean, newLikeCount: number) => void;
}

export const PostLikeButton = ({ post, onLikeToggle }: PostLikeButtonProps) => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const [isPending, startTransition] = useTransition();
  
  // likes가 배열인지 확인하고 파싱
  const parseLikes = (likes: any): string[] => {
    if (Array.isArray(likes)) {
      return likes;
    }
    if (typeof likes === "string") {
      try {
        const parsed = JSON.parse(likes);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const likesArray = parseLikes(post.likes);
  const [isLiked, setIsLiked] = useState(
    user.id ? likesArray.includes(user.id) : false
  );
  const [likeCount, setLikeCount] = useState(likesArray.length);

  const handleLike = async () => {
    if (!user.id || !user.email) {
      alert(t("common.loginRequired"));
      return;
    }

    startTransition(() => {
      void (async () => {
        try {
          const newIsLiked = await togglePostLike(post.index);
          setIsLiked(newIsLiked);
          const newCount = newIsLiked ? likeCount + 1 : likeCount - 1;
          setLikeCount(newCount);
          onLikeToggle?.(newIsLiked, newCount);
        } catch (error) {
          console.error("Failed to toggle like:", error);
          alert(
            error instanceof Error
              ? error.message
              : t("posts.errorLike")
          );
        }
      })();
    });
  };

  if (!user.id || !user.email) {
    return null; // 로그인하지 않은 사용자에게는 버튼을 표시하지 않음
  }

  return (
    <button
      className={styles.like_button}
      onClick={handleLike}
      disabled={isPending}
      aria-label={isLiked ? t("posts.unlike") : t("posts.like")}
    >
      <FontAwesomeIcon
        icon={isLiked ? solidHeart : regularHeart}
        className={`${styles.heart_icon} ${isLiked ? styles.liked : styles.not_liked}`}
      />
      <span className={styles.like_count}>{likeCount}</span>
    </button>
  );
};
