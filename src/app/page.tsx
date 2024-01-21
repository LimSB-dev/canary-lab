import { MainCard } from "@/components/main/organisms";
import styles from "./page.module.css";

import {
  HeaderContainer,
  InfoContainer,
  PostContainer,
  SideContainer,
} from "@/components/main/templates_";

export default function Home() {
  return (
    <main id="main-page" role="main" className={styles.main}>
      <div className={styles.right}>
        <div className={styles.right_top_right}>
          <InfoContainer />
          <div className={styles.right_top_left}>
            <HeaderContainer />
            <MainCard />
          </div>
        </div>
        <PostContainer />
      </div>
      <SideContainer />
    </main>
  );
}
