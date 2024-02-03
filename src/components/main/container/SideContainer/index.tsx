"use client";

import styles from "./styles.module.scss";

import {
  ArrowCard,
  OauthCard,
  PostCard,
  RecentCard,
  ResetCard,
  SearchCard,
  ThemeToggleCard,
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
        <div className={styles.side_header_right}>
          <div className={styles.theme}>
            <ThemeToggleCard theme={"light"} />
            <ThemeToggleCard theme={"dark"} />
          </div>
          <SearchCard />
        </div>
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
        <div className={styles.side_header_right}>
          <div className={styles.theme}>
            <ThemeToggleCard theme={"light"} />
            <ThemeToggleCard theme={"dark"} />
          </div>
          <SearchCard />
        </div>
        <OauthCard />
      </div>
      <WeatherCard />
      <PostCard type={"popular"} />
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
        <div className={styles.side_header_right}>
          <div className={styles.theme}>
            <ThemeToggleCard theme={"light"} />
            <ThemeToggleCard theme={"dark"} />
          </div>
          <SearchCard />
        </div>
        <OauthCard />
      </div>
      <WeatherCard />
      <PostCard type={"popular"} />
    </section>
  );
};

const DesktopSideContainer = () => {
  return (
    <section className={styles.side_section}>
      <div className={styles.side_header}>
        <div className={styles.side_header_right}>
          <div className={styles.theme}>
            <ThemeToggleCard theme={"light"} />
            <ThemeToggleCard theme={"dark"} />
          </div>
          <SearchCard />
        </div>
        <OauthCard />
      </div>
      <WeatherCard />
      <PostCard type={"popular"} />
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
