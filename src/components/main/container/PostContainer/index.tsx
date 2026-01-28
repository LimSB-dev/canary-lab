"use client";

import { useEffect, useMemo, useState } from "react";
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

const RecentPostSection = ({
  recentPosts,
  size,
  isLoading,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return Array.from({ length: size }, (_, index) => (
      <SkeletonPostCard key={index} />
    ));
  }

  if (isEmpty(recentPosts)) {
    return <div>최근 게시글이 없습니다.</div>;
  }

  return recentPosts
    .slice(0, size)
    .map((post) => <RecentPostCard key={post.id} post={post} />);
};

const MobilePostContainer = ({
  popularPosts,
  recentPosts,
  size,
  isLoading,
}: {
  popularPosts: IPost[];
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
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
        />
      </section>
    </div>
  );
};

const TabletPostContainer = ({
  recentPosts,
  size,
  isLoading,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
}) => {
  return (
    <section className={styles.post_section}>
      <RecentPostSection
        recentPosts={recentPosts}
        size={size}
        isLoading={isLoading}
      />
    </section>
  );
};

const LaptopPostContainer = ({
  recentPosts,
  size,
  isLoading,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
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
      />
    </section>
  );
};

const DesktopPostContainer = ({
  recentPosts,
  size,
  isLoading,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
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
      />
    </section>
  );
};

export const PostContainer = ({ popularPosts }: { popularPosts: IPost[] }) => {
  const offset = useAppSelector((state) => state.post.offset) ?? 0;
  const deviceType = useDevice();
  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchPosts() {
      try {
        setIsLoading(true);

        const response = await fetch(
          `/api/posts/recent?size=${size}&offset=${offset}`,
          { signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const posts = await response.json();
        setRecentPosts(posts);

        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          console.log("Request aborted:", error.message);
        } else {
          console.error("Fetch error:", error);
        }
      }
    }
    fetchPosts();

    return () => controller.abort();
  }, [size, offset]);

  switch (deviceType) {
    case "mobile":
      return (
        <MobilePostContainer
          popularPosts={popularPosts}
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
        />
      );
    case "tablet":
      return (
        <TabletPostContainer
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
        />
      );
    case "laptop":
      return (
        <LaptopPostContainer
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
        />
      );
    case "desktop":
      return (
        <DesktopPostContainer
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
        />
      );
    default:
      return null;
  }
};
