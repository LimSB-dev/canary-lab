import styles from "./styles.module.scss";

export const RoleCard = () => {
  return (
    <article className={styles.card}>
      <h4 className={styles.role}>
        Frontend
        <br />
        Developer
      </h4>
    </article>
  );
};
