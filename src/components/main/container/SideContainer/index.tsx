"use client";

import { useMediaQuery } from "react-responsive";
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
import { BREAKPOINT } from "@/constant/breakpoint";

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
      return isMobile && <MobileSideContainer />;
    case "tablet":
      return isTablet && <TabletSideContainer />;
    case "laptop":
      return isLaptop && <LaptopSideContainer />;
    case "desktop":
      return isDesktop && <DesktopSideContainer />;
    default:
      return null;
  }
};
