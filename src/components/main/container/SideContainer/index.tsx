"use client";

import styles from "./styles.module.scss";

import {
  ArrowCard,
  OauthCard,
  PopularPostCard,
  RecentCard,
  ResetCard,
  SearchCard,
  WeatherCard,
} from "@/components/main/card";
import { useDevice } from "@/hooks/useDevice";

interface IProps {
  device: Device;
  popularPosts: IPost[];
}

const MobileSideContainer = () => {
  return (
    <section className={styles.side_section}>
      <div className={styles.side_header}>
        <SearchCard />
        <OauthCard />
      </div>
      <WeatherCard />
    </section>
  );
};

const TabletSideContainer = ({ popularPosts }: { popularPosts: IPost[] }) => {
  return (
    <section className={styles.side_section}>
      <div className={styles.side_header}>
        <SearchCard />
        <OauthCard />
      </div>
      <WeatherCard />
      <PopularPostCard popularPosts={popularPosts} />
      <div className={styles.post_controller}>
        <RecentCard />
        <ResetCard />
        <ArrowCard />
      </div>
    </section>
  );
};

const LaptopSideContainer = ({ popularPosts }: { popularPosts: IPost[] }) => {
  return (
    <section className={styles.side_section}>
      <div className={styles.side_header}>
        <SearchCard />
        <OauthCard />
      </div>
      <WeatherCard />
      <PopularPostCard popularPosts={popularPosts} />
    </section>
  );
};

const DesktopSideContainer = ({ popularPosts }: { popularPosts: IPost[] }) => {
  return (
    <section className={styles.side_section}>
      <div className={styles.side_header}>
        <SearchCard />
        <OauthCard />
      </div>
      <WeatherCard />
      <PopularPostCard popularPosts={popularPosts} />
    </section>
  );
};

export const SideContainer = ({ device, popularPosts }: IProps) => {
  const deviceType = useDevice();

  if (deviceType !== device) return null;

  switch (device) {
    case "mobile":
      return <MobileSideContainer />;
    case "tablet":
      return <TabletSideContainer popularPosts={popularPosts} />;
    case "laptop":
      return <LaptopSideContainer popularPosts={popularPosts} />;
    case "desktop":
      return <DesktopSideContainer popularPosts={popularPosts} />;
    default:
      return null;
  }
};
