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

interface IProps {
  popularPosts: IPost[];
}

const MobilePostContainer = ({
  popularPosts,
  recentPosts,
}: {
  popularPosts: IPost[];
  recentPosts: IPost[];
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
        {recentPosts.slice(0, 1).map((post) => (
          <RecentPostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
};

const TabletPostContainer = ({ recentPosts }: { recentPosts: IPost[] }) => {
  return (
    <section className={styles.post_section}>
      {recentPosts.slice(0, 3).map((post) => (
        <RecentPostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

const LaptopPostContainer = ({ recentPosts }: { recentPosts: IPost[] }) => {
  return (
    <section className={styles.post_section}>
      <div className={styles.post_controller}>
        <RecentCard />
        <ResetCard />
        <ArrowCard />
      </div>
      {recentPosts.slice(0, 4).map((post) => (
        <RecentPostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

const DesktopPostContainer = ({ recentPosts }: { recentPosts: IPost[] }) => {
  return (
    <section className={styles.post_section}>
      <div className={styles.post_controller}>
        <RecentCard />
        <ResetCard />
        <ArrowCard />
      </div>
      {recentPosts.slice(0, 4).map((post) => (
        <RecentPostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export const PostContainer = ({ popularPosts }: IProps) => {
  const offset = useAppSelector((state) => state.post.offset) ?? 0;
  const deviceType = useDevice();
  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);
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
        />
      );
    case "tablet":
      return <TabletPostContainer recentPosts={recentPosts} />;
    case "laptop":
      return <LaptopPostContainer recentPosts={recentPosts} />;
    case "desktop":
      return <DesktopPostContainer recentPosts={recentPosts} />;
    default:
      return null;
  }
};
