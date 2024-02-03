import styles from "./styles.module.scss";

export const RoleCard = () => {
  return (
    <article className={styles.card}>
      <p className={styles.role}>
        Frontend
        <br />
        Developer
      </p>
    </article>
  );
};
