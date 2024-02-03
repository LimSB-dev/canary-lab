"use client";

import styles from "./styles.module.scss";

import {
  ArrowCard,
  PostCard,
  RecentCard,
  ResetCard,
} from "@/components/main/card";
import { useDevice } from "@/hooks/useDevice";

interface IProps {
  device: Device;
}

const MobilePostContainer = () => {
  return (
    <div className={styles.post_controller}>
      <PostCard type={"popular"} />
      <section className={styles.post_section}>
        <div className={styles.post_controller}>
          <RecentCard />
          <ResetCard />
          <ArrowCard />
        </div>
        {Array.from({ length: 1 }).map((_, index) => (
          <PostCard key={index} type={"recent"} />
        ))}
      </section>
    </div>
  );
};

const TabletPostContainer = () => {
  return (
    <section className={styles.post_section}>
      {Array.from({ length: 3 }).map((_, index) => (
        <PostCard key={index} type={"recent"} />
      ))}
    </section>
  );
};

const LaptopPostContainer = () => {
  return (
    <section className={styles.post_section}>
      <div className={styles.post_controller}>
        <RecentCard />
        <ResetCard />
        <ArrowCard />
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <PostCard key={index} type={"recent"} />
      ))}
    </section>
  );
};

const DesktopPostContainer = () => {
  return (
    <section className={styles.post_section}>
      <div className={styles.post_controller}>
        <RecentCard />
        <ResetCard />
        <ArrowCard />
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <PostCard key={index} type={"recent"} />
      ))}
    </section>
  );
};

export const PostContainer = ({ device }: IProps) => {
  const deviceType = useDevice();

  if (deviceType !== device) return null;

  switch (device) {
    case "mobile":
      return <MobilePostContainer />;
    case "tablet":
      return <TabletPostContainer />;
    case "laptop":
      return <LaptopPostContainer />;
    case "desktop":
      return <DesktopPostContainer />;
    default:
      return null;
  }
};
