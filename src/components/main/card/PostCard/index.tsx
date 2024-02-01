import styles from "./styles.module.scss";

export const PostCard = ({ type }: { type: "recent" | "popular" }) => {
  return (
    <article
      className={type === "recent" ? styles.card_resent : styles.card_popular}
    >
      <h2>PostCard</h2>
    </article>
  );
};
