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

const TabletSideContainer = () => {
  return (
    <section className={styles.side_section}>
      <div className={styles.side_header}>
        <SearchCard />
        <OauthCard />
      </div>
      <WeatherCard />
      <PopularPostCard />
      <div className={styles.post_controller}>
        <RecentCard />
        <ResetCard />
        <ArrowCard />
      </div>
    </section>
  );
};

const LaptopSideContainer = () => {
  return (
    <section className={styles.side_section}>
      <div className={styles.side_header}>
        <SearchCard />
        <OauthCard />
      </div>
      <WeatherCard />
      <PopularPostCard />
    </section>
  );
};

const DesktopSideContainer = () => {
  return (
    <section className={styles.side_section}>
      <div className={styles.side_header}>
        <SearchCard />
        <OauthCard />
      </div>
      <WeatherCard />
      <PopularPostCard />
    </section>
  );
};

export const SideContainer = ({ device }: IProps) => {
  const deviceType = useDevice();

  if (deviceType !== device) return null;

  switch (device) {
    case "mobile":
      return <MobileSideContainer />;
    case "tablet":
      return <TabletSideContainer />;
    case "laptop":
      return <LaptopSideContainer />;
    case "desktop":
      return <DesktopSideContainer />;
    default:
      return null;
  }
};
