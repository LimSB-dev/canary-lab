"use client";

import { useMemo } from "react";
import { isEmpty } from "lodash";
import styles from "./styles.module.scss";

import {
  ArrowCard,
  PopularPostCard,
  RecentCard,
  RecentPostCard,
  ResetCard,
  SkeletonPostCard,
} from "@/components/main/card";
import { useAppSelector } from "@/hooks/reduxHook";
import { useDevice } from "@/hooks/useDevice";
import { useRecentPosts } from "@/hooks/useRecentPosts";

/** 캐러셀 이동 시 기존 데이터 유지 + 새 슬롯에만 스켈레톤 1개 (stale-while-revalidate) */
const RecentPostSection = ({
  recentPosts,
  size,
  isLoading,
  offset,
  fetchedForOffset,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
  offset: number;
  fetchedForOffset: number | null;
}) => {
  const hasStaleData =
    isLoading && recentPosts.length > 0 && fetchedForOffset !== null && offset !== fetchedForOffset;

  if (hasStaleData) {
    const movedRight = offset > fetchedForOffset;
    const staleSlice = movedRight
      ? recentPosts.slice(1, size)
      : recentPosts.slice(0, size - 1);
    const skeletonKey = movedRight ? "skeleton-right" : "skeleton-left";
    return (
      <>
        {!movedRight && <SkeletonPostCard key={skeletonKey} />}
        {staleSlice.map((post) => (
          <RecentPostCard key={post.id} post={post} />
        ))}
        {movedRight && <SkeletonPostCard key={skeletonKey} />}
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        {Array.from({ length: size }, (_, index) => (
          <SkeletonPostCard key={`skeleton-${index}`} />
        ))}
      </>
    );
  }

  if (isEmpty(recentPosts)) {
    return <div>최근 게시글이 없습니다.</div>;
  }

  return (
    <>
      {recentPosts.slice(0, size).map((post) => (
        <RecentPostCard key={post.id} post={post} />
      ))}
    </>
  );
};

const MobilePostContainer = ({
  popularPosts,
  recentPosts,
  size,
  isLoading,
  offset,
  fetchedForOffset,
}: {
  popularPosts: IPost[];
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
  offset: number;
  fetchedForOffset: number | null;
}) => {
  return (
    <div className={styles.post_controller}>
      <PopularPostCard popularPosts={popularPosts} />
      <section className={styles.post_section}>
        <div className={styles.post_controller}>
          <RecentCard />
          <ResetCard />
          <ArrowCard />
        </div>
        <RecentPostSection
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
          offset={offset}
          fetchedForOffset={fetchedForOffset}
        />
      </section>
    </div>
  );
};

const TabletPostContainer = ({
  recentPosts,
  size,
  isLoading,
  offset,
  fetchedForOffset,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
  offset: number;
  fetchedForOffset: number | null;
}) => {
  return (
    <section className={styles.post_section}>
      <RecentPostSection
        recentPosts={recentPosts}
        size={size}
        isLoading={isLoading}
        offset={offset}
        fetchedForOffset={fetchedForOffset}
      />
    </section>
  );
};

const LaptopPostContainer = ({
  recentPosts,
  size,
  isLoading,
  offset,
  fetchedForOffset,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
  offset: number;
  fetchedForOffset: number | null;
}) => {
  return (
    <section className={styles.post_section}>
      <div className={styles.post_controller}>
        <RecentCard />
        <ResetCard />
        <ArrowCard />
      </div>
      <RecentPostSection
        recentPosts={recentPosts}
        size={size}
        isLoading={isLoading}
        offset={offset}
        fetchedForOffset={fetchedForOffset}
      />
    </section>
  );
};

const DesktopPostContainer = ({
  recentPosts,
  size,
  isLoading,
  offset,
  fetchedForOffset,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
  offset: number;
  fetchedForOffset: number | null;
}) => {
  return (
    <section className={styles.post_section}>
      <div className={styles.post_controller}>
        <RecentCard />
        <ResetCard />
        <ArrowCard />
      </div>
      <RecentPostSection
        recentPosts={recentPosts}
        size={size}
        isLoading={isLoading}
        offset={offset}
        fetchedForOffset={fetchedForOffset}
      />
    </section>
  );
};

export const PostContainer = ({ popularPosts }: { popularPosts: IPost[] }) => {
  const offset = useAppSelector((state) => state.post.offset) ?? 0;
  const deviceType = useDevice();

  const size = useMemo(() => {
    switch (deviceType) {
      case "min":
      case "mobile":
        return 1;
      case "tablet":
        return 3;
      case "laptop":
      case "desktop":
        return 4;
      case "max":
      default:
        return 5;
    }
  }, [deviceType]);

  const {
    recentPosts,
    isPending,
    isFetching,
    isPlaceholderData,
    fetchedForOffset,
  } = useRecentPosts(size, offset);

  const isLoading = isPending || (isFetching && isPlaceholderData);

  switch (deviceType) {
    case "mobile":
      return (
        <MobilePostContainer
          popularPosts={popularPosts}
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
          offset={offset}
          fetchedForOffset={fetchedForOffset}
        />
      );
    case "tablet":
      return (
        <TabletPostContainer
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
          offset={offset}
          fetchedForOffset={fetchedForOffset}
        />
      );
    case "laptop":
      return (
        <LaptopPostContainer
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
          offset={offset}
          fetchedForOffset={fetchedForOffset}
        />
      );
    case "desktop":
      return (
        <DesktopPostContainer
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
          offset={offset}
          fetchedForOffset={fetchedForOffset}
        />
      );
    default:
      return null;
  }
};
