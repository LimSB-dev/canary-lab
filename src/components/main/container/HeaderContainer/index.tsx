import styles from "./styles.module.scss";

import { FigmaCard, LanguageCard, MusicCard } from "@/components/main/card";

export const HeaderContainer = () => {
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
