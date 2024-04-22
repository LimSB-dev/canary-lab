"use client";

import styles from "./styles.module.scss";

import {
  ArrowCard,
  PopularPostCard,
  RecentCard,
  RecentPostCard,
  ResetCard,
} from "@/components/main/card";
import { useDevice } from "@/hooks/useDevice";

interface IProps {
  device: Device;
  popularPosts: IPost[];
  recentPosts: IPost[];
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

export const PostContainer = ({
  device,
  popularPosts,
  recentPosts,
}: IProps) => {
  const deviceType = useDevice();

  if (deviceType !== device) return null;

  switch (device) {
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
