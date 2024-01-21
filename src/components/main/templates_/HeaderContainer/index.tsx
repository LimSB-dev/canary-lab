import styles from "./styles.module.scss";

import {
  FigmaCard,
  LanguageCard,
  MusicCard,
} from "@/components/main/organisms";

export const HeaderContainer = () => {
  return (
    <header className={styles.header_section}>
      <FigmaCard />
      <MusicCard />
      <LanguageCard />
    </header>
  );
};
