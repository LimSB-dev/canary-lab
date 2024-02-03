"use client";

import Image from "next/image";

import styles from "./styles.module.scss";
import { useDevice } from "@/hooks/useDevice";
import { META_DATA } from "@/constant/metadata";

interface IProps {
  device: Device;
}

const MobileMainCard = () => {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>{META_DATA.APP_NAME}</h1>
      <div id="dim" className={styles.dim} />
      <Image
        src="/assets/images/canary.svg"
        alt="Canary"
        fill
        objectFit="cover"
        priority
      />
    </section>
  );
};

const TabletMainCard = () => {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>{META_DATA.APP_NAME}</h1>
      <div id="dim" className={styles.dim} />
      <Image
        src="/assets/images/canary.svg"
        alt="Canary"
        fill
        objectFit="cover"
        priority
      />
    </section>
  );
};

const LaptopMainCard = () => {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>{META_DATA.APP_NAME}</h1>
      <div id="dim" className={styles.dim} />
      <Image src="/assets/images/canary.svg" alt="Canary" fill priority />
    </section>
  );
};

const DesktopMainCard = () => {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>{META_DATA.APP_NAME}</h1>
      <div id="dim" className={styles.dim} />
      <Image src="/assets/images/canary.svg" alt="Canary" fill priority />
    </section>
  );
};

export const MainCard = ({ device }: IProps) => {
  const deviceType = useDevice();

  if (deviceType !== device) return null;

  switch (device) {
    case "mobile":
      return <MobileMainCard />;
    case "tablet":
      return <TabletMainCard />;
    case "laptop":
      return <LaptopMainCard />;
    case "desktop":
      return <DesktopMainCard />;
    default:
      return null;
  }
};
