import styles from "./page.module.scss";

import { MainCard } from "@/components/main/card";
import {
  HeaderContainer,
  InfoContainer,
  PostContainer,
  SideContainer,
} from "@/components/main/container";
import { fetchPopularPosts, fetchRecentPosts } from "@/lib/fetch/posts";

export default async function Home() {
  const popularPosts = await fetchPopularPosts();
  const recentPosts = await fetchRecentPosts();

  return (
    <main id="main-page" role="main" className={styles.main}>
      <MainCard device="mobile" />
      <article className={styles.article}>
        <div className={styles.flex_column}>
          <SideContainer device="mobile" popularPosts={popularPosts} />
          <div className={styles.flex_row}>
            <div className={styles.flex_column}>
              <MainCard device="tablet" />
              <div className={styles.flex_row}>
                <SideContainer device="tablet" popularPosts={popularPosts} />
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
            <SideContainer device="laptop" popularPosts={popularPosts} />
          </div>
          <PostContainer
            device="mobile"
            popularPosts={popularPosts}
            recentPosts={recentPosts}
          />
          <PostContainer
            device="tablet"
            popularPosts={popularPosts}
            recentPosts={recentPosts}
          />
          <PostContainer
            device="laptop"
            popularPosts={popularPosts}
            recentPosts={recentPosts}
          />
          <PostContainer
            device="desktop"
            popularPosts={popularPosts}
            recentPosts={recentPosts}
          />
        </div>
        <SideContainer device="desktop" popularPosts={popularPosts} />
      </article>
    </main>
  );
}
