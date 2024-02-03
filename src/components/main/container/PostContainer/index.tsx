"use client";

import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.scss";

import {
  ArrowCard,
  PostCard,
  RecentCard,
  ResetCard,
} from "@/components/main/card";
import { BREAKPOINT } from "@/constant/breakpoint";

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
  const isMobile = useMediaQuery({
    minWidth: BREAKPOINT.mobile,
    maxWidth: BREAKPOINT.tablet,
  });
  const isTablet = useMediaQuery({
    minWidth: BREAKPOINT.tablet,
    maxWidth: BREAKPOINT.laptop,
  });
  const isLaptop = useMediaQuery({
    minWidth: BREAKPOINT.laptop,
    maxWidth: BREAKPOINT.desktop,
  });
  const isDesktop = useMediaQuery({
    minWidth: BREAKPOINT.desktop,
  });

  switch (device) {
    case "mobile":
      return isMobile && <MobilePostContainer />;
    case "tablet":
      return isTablet && <TabletPostContainer />;
    case "laptop":
      return isLaptop && <LaptopPostContainer />;
    case "desktop":
      return isDesktop && <DesktopPostContainer />;
  }
};
