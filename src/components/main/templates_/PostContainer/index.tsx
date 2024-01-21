import styles from "./styles.module.scss";

import {
  ArrowCard,
  PostCard,
  RecentPostsCard,
  ResetCard,
} from "@/components/main/organisms";

export const PostContainer = () => {
  return (
    <section className={styles.post_section}>
      <div className={styles.post_controller}>
        <RecentPostsCard />
        <ResetCard />
        <ArrowCard />
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <PostCard key={index} type={"recent"} />
      ))}
    </section>
  );
};
