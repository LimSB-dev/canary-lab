"use client";

import styles from "./styles.module.scss";

import {
  ArrowCard,
  PopularPostCard,
  RecentCard,
  RecentPostCard,
  ResetCard,
} from "@/components/main/card";
import { useAppSelector } from "@/hooks/reduxHook";
import { useDevice } from "@/hooks/useDevice";
import { useEffect, useState } from "react";
import { SkeletonPostCard } from "../../card/PostCard";

interface IProps {
  popularPosts: IPost[];
}

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
        {!isLoading
          ? Array(size)
              .fill(0)
              .map((_, index) => <SkeletonPostCard key={index} />)
          : recentPosts
              .slice(0, size)
              .map((post) => <RecentPostCard key={post.id} post={post} />)}
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
      {isLoading
        ? Array(size)
            .fill(0)
            .map((_, index) => <SkeletonPostCard key={index} />)
        : recentPosts
            .slice(0, size)
            .map((post) => <RecentPostCard key={post.id} post={post} />)}
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
      {isLoading
        ? Array(size)
            .fill(0)
            .map((_, index) => <SkeletonPostCard key={index} />)
        : recentPosts
            .slice(0, size)
            .map((post) => <RecentPostCard key={post.id} post={post} />)}
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
      {isLoading
        ? Array(size)
            .fill(0)
            .map((_, index) => <SkeletonPostCard key={index} />)
        : recentPosts
            .slice(0, size)
            .map((post) => <RecentPostCard key={post.id} post={post} />)}
    </section>
  );
};

export const PostContainer = ({ popularPosts }: IProps) => {
  const offset = useAppSelector((state) => state.post.offset) ?? 0;
  const deviceType = useDevice();
  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const size = (() => {
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
  })();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setIsLoading(true);

    async function fetchPosts() {
      try {
        const response = await fetch(
          `/api/posts/recent?size=${size}&offset=${offset}`,
          { signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const posts = await response.json();
        setRecentPosts(posts);
      } catch (error) {
        if (error instanceof Error) {
          console.log("Request aborted:", error.message);
        } else {
          console.error("Fetch error:", error);
        }
      } finally {
        setIsLoading(false);
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
