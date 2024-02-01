import styles from "./styles.module.scss";

import {
  OauthCard,
  PostCard,
  SearchCard,
  ThemeToggleCard,
  WeatherCard,
} from "@/components/main/card";

export const SideContainer = () => {
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
