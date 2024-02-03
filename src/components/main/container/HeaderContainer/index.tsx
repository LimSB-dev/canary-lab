"use client";

import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.scss";

import { FigmaCard, LanguageCard, MusicCard } from "@/components/main/card";

export const HeaderContainer = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <section className={styles.header_section}>
      <div className={styles.top}>
        <FigmaCard />
        <MusicCard />
      </div>
      <LanguageCard />
    </section>
  );
};
