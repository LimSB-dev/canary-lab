"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { PostListItem, SkeletonPostListItem } from "@/components/posts/postListItem";
import { getTags } from "@/app/api/tags";
import { useAppSelector } from "@/hooks/reduxHook";
import { useTranslation } from "@/hooks/useTranslation";

const PAGE_SIZE = 20;

export default function PostsList() {
  const { t } = useTranslation();
  const selectedTagIds = useAppSelector((state) => state.tag.selectedTagIds);
  const selectedKey = useMemo(
    () => selectedTagIds.slice().sort().join(","),
    [selectedTagIds]
  );

  const [tags, setTags] = useState<ITag[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const observerTarget = useRef<HTMLDivElement | null>(null);

  const fetchPosts = async (pageNum: number, append: boolean) => {
    const offset = pageNum * PAGE_SIZE;
    const qs = new URLSearchParams();
    qs.set("limit", String(PAGE_SIZE));
    qs.set("offset", String(offset));
    if (selectedTagIds.length) {
      qs.set("tagIds", selectedTagIds.join(","));
    }

    const res = await fetch(`/api/posts/list?${qs.toString()}`);
    if (!res.ok) {
      throw new Error("게시글을 불러오지 못했습니다.");
    }
    const data = (await res.json()) as IPost[];

    setHasMore(data.length === PAGE_SIZE);
    setPosts((prev) => (append ? [...prev, ...data] : data));
  };

  useEffect(() => {
    // 태그 목록은 1회만 로드
    getTags()
      .then((t) => setTags(t))
      .catch((e) => console.error("Failed to load tags:", e));
  }, []);

  useEffect(() => {
    // 필터 변경 시 초기화 + 스켈레톤
    setIsLoading(true);
    setIsLoadingMore(false);
    setHasMore(true);
    setPage(0);
    setPosts([]);

    fetchPosts(0, false)
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey]);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        if (isLoading || isLoadingMore || !hasMore) return;

        const next = page + 1;
        setIsLoadingMore(true);
        setPage(next);
        fetchPosts(next, true)
          .catch((e) => console.error(e))
          .finally(() => setIsLoadingMore(false));
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, isLoading, isLoadingMore, page, selectedKey, selectedTagIds]);

  const emptyText = selectedTagIds.length
    ? t("posts.noPostsForTag")
    : t("posts.noPosts");

  if (isLoading) {
    return <SkeletonPostsList count={PAGE_SIZE} />;
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
        {isLoadingMore && t("posts.loadingMore")}
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
