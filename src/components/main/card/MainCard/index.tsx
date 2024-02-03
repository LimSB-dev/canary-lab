"use client";

import Image from "next/image";

import styles from "./styles.module.scss";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINT } from "@/constant/breakpoint";

interface IProps {
  device: Device;
}

const MobileCard = () => {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>Canary Lab</h1>
      <div id="dim" className={styles.dim} />
      <Image
        src="/assets/images/canary.svg"
        alt="Canary"
        fill
        objectFit="cover"
      />
    </section>
  );
};

const LaptopCard = () => {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>Canary Lab</h1>
      <div id="dim" className={styles.dim} />
      <Image src="/assets/images/canary.svg" alt="Canary" fill />
    </section>
  );
};

const DesktopCard = () => {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>Canary Lab</h1>
      <div id="dim" className={styles.dim} />
      <Image src="/assets/images/canary.svg" alt="Canary" fill />
    </section>
  );
};

export const MainCard = ({ device }: IProps) => {
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
      return isMobile && <MobileCard />;
    case "tablet":
      return isTablet && <MobileCard />;
    case "laptop":
      return isLaptop && <LaptopCard />;
    case "desktop":
      return isDesktop && <DesktopCard />;
    default:
      return null;
  }
};
