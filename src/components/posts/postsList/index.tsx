"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { PostListItem, SkeletonPostListItem } from "@/components/posts/postListItem";
import { useAppSelector } from "@/hooks/reduxHook";
import { useTranslation } from "@/hooks/useTranslation";
import { useTags } from "@/hooks/useTags";
import { usePostsList } from "@/hooks/usePostsList";
import { POSTS_LIST_PAGE_SIZE } from "@/constants/pagination";

export default function PostsList() {
  const { t } = useTranslation();
  const selectedTagIds = useAppSelector((state) => state.tag.selectedTagIds);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  const { data: tagsData } = useTags();
  const tags = tagsData ?? [];

  const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
    usePostsList(selectedTagIds);

  const posts = data?.pages.flat() ?? [];

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

  const emptyText = selectedTagIds.length ? t("posts.noPostsForTag") : t("posts.noPosts");

  if (isPending) {
    return <SkeletonPostsList count={POSTS_LIST_PAGE_SIZE} />;
  }

  if (posts.length === 0) {
    return <div className={styles.empty}>{emptyText}</div>;
  }

  return (
    <>
      <ul className={styles.post_list}>
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} tags={tags} />
        ))}
      </ul>
      <div ref={observerTarget} className={styles.loading_more}>
        {isFetchingNextPage && t("posts.loadingMore")}
      </div>
    </>
  );
}

export const SkeletonPostsList = ({ count = 10 }: { count?: number }) => {
  return (
    <ul className={styles.post_list}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <SkeletonPostListItem key={index} />
        ))}
    </ul>
  );
};
