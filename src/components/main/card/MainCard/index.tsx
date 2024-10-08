"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

import { TypeAnimation } from "react-type-animation";
import styles from "./styles.module.scss";
import "@/styles/globals.css";

import { useDevice } from "@/hooks/useDevice";
import { META_DATA } from "@/constants/metadata";
import { MAIN_CARD_SEQUENCE } from "@/constants/sequence/sequence";
import { ImageCardShadow } from "..";

interface IProps {
  device: Device;
}

interface IDescription {
  isHover: boolean;
}
interface ICardProps {
  isHover: boolean;
  setIsHover: Dispatch<SetStateAction<boolean>>;
}

const Description = ({ isHover }: IDescription) => {
  if (isHover) {
    return (
      <TypeAnimation
        className={styles.description}
        sequence={MAIN_CARD_SEQUENCE}
      />
    );
  }
};

const Dim = () => {
  return <div id="dim" className={styles.dim} />;
};

const MobileMainCard = ({ isHover, setIsHover }: ICardProps) => {
  return (
    <section
      className={styles.card}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h1 className={styles.title}>{META_DATA.APP_NAME}</h1>
      <Description isHover={isHover} />
      <Dim />
      <Image
        className={`${styles.image} ${
          isHover ? styles.zoomIn : styles.zoomOut
        }`}
        src="/assets/images/canary.svg"
        alt="Canary"
        fill
        priority
      />
    </section>
  );
};

const TabletMainCard = ({ isHover, setIsHover }: ICardProps) => {
  return (
    <section
      className={styles.card}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h1 className={styles.title}>{META_DATA.APP_NAME}</h1>
      <Description isHover={isHover} />
      <ImageCardShadow />
      <Dim />
      <Image
        className={`${styles.image} ${
          isHover ? styles.zoomIn : styles.zoomOut
        }`}
        src="/assets/images/canary.svg"
        alt="Canary"
        fill
        priority
      />
    </section>
  );
};

const LaptopMainCard = ({ isHover, setIsHover }: ICardProps) => {
  return (
    <section
      className={styles.card}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h1 className={styles.title}>{META_DATA.APP_NAME}</h1>
      <Description isHover={isHover} />
      <ImageCardShadow />
      <Dim />
      <Image
        className={`${styles.image} ${
          isHover ? styles.zoomIn : styles.zoomOut
        }`}
        src="/assets/images/canary.svg"
        alt="Canary"
        fill
        priority
      />
    </section>
  );
};

const DesktopMainCard = ({ isHover, setIsHover }: ICardProps) => {
  return (
    <section
      className={styles.card}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h1 className={styles.title}>{META_DATA.APP_NAME}</h1>
      <Description isHover={isHover} />
      <ImageCardShadow />
      <Dim />
      <Image
        className={`${styles.image} ${
          isHover ? styles.zoomIn : styles.zoomOut
        }`}
        src="/assets/images/canary.svg"
        alt="Canary"
        fill
        priority
      />
    </section>
  );
};

export const MainCard = ({ device }: IProps) => {
  const deviceType = useDevice();
  const [isHover, setIsHover] = useState(false);

  if (deviceType !== device) return null;

  switch (device) {
    case "mobile":
      return <MobileMainCard isHover={isHover} setIsHover={setIsHover} />;
    case "tablet":
      return <TabletMainCard isHover={isHover} setIsHover={setIsHover} />;
    case "laptop":
      return <LaptopMainCard isHover={isHover} setIsHover={setIsHover} />;
    case "desktop":
      return <DesktopMainCard isHover={isHover} setIsHover={setIsHover} />;
    default:
      return null;
  }
};
