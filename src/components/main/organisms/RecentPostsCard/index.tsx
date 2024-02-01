import Link from "next/link";
import styles from "./styles.module.scss";

export const RecentPostsCard = () => {
  return (
    <article id="recent-posts-card" className={styles.card}>
      <h2>
        Recent
        <br />
        Posts
      </h2>
      <Link className={styles.more} href="/posts" passHref>
        more...
      </Link>
    </article>
  );
};
