import styles from "./styles.module.scss";

export const RecentPostsCard = () => {
  return (
    <article id="recent-posts-card" className={styles.card}>
      <h2>
        Recent
        <br />
        Posts
      </h2>
      <button type="button" className={styles.more}>
        more...
      </button>
    </article>
  );
};
