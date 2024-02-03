import styles from "./page.module.scss";

import { MainCard } from "@/components/main/card";
import {
  HeaderContainer,
  InfoContainer,
  PostContainer,
  SideContainer,
} from "@/components/main/container";

export default function Home() {
  return (
    <main id="main-page" role="main" className={styles.main}>
      <MainCard device="mobile" />
      <article className={styles.article}>
        <div className={styles.flex_column}>
          <SideContainer device="mobile" />
          <div className={styles.flex_row}>
            <div className={styles.flex_column}>
              <MainCard device="tablet" />
              <div className={styles.flex_row}>
                <SideContainer device="tablet" />
                <div
                  className={`${styles.flex_column_reverse} ${styles.flex_row}`}
                >
                  <InfoContainer />
                  <div className={styles.flex_column}>
                    <HeaderContainer />
                    <MainCard device="desktop" />
                  </div>
                </div>
              </div>
              <MainCard device="laptop" />
            </div>
            <SideContainer device="laptop" />
          </div>
          <PostContainer device="mobile" />
          <PostContainer device="tablet" />
          <PostContainer device="laptop" />
          <PostContainer device="desktop" />
        </div>
        <SideContainer device="desktop" />
      </article>
    </main>
  );
}
