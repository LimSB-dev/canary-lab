import { MainHeader } from "@/components/common/header";
import styles from "./page.module.scss";

import { MainCard } from "@/components/main/card";
import {
  HeaderContainer,
  InfoContainer,
  PostContainer,
  ProjectsSection,
  SideContainer,
} from "@/components/main/container";
import { getPopularPosts } from "@/app/api/posts";
import { getProjectPreviews } from "@/app/api/projects/getPreview";
import { PROJECT_URLS } from "@/constants/projects";

export default async function Home() {
  const [popularPosts, projectPreviews] = await Promise.all([
    getPopularPosts(),
    getProjectPreviews(PROJECT_URLS),
  ]);

  return (
    <>
      <MainHeader />
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
            <PostContainer popularPosts={popularPosts} />
          </div>
          <SideContainer device="desktop" popularPosts={popularPosts} />
        </article>
        <article className={`${styles.article} ${styles.article_full_width}`}>
          <ProjectsSection previews={projectPreviews} />
        </article>
      </main>
    </>
  );
}
