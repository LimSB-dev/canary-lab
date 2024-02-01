import Image from "next/image";

import styles from "./styles.module.scss";

export const MainCard = () => {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>Canary Lab</h1>
      <div id="dim" className={styles.dim} />
      <Image src="/assets/images/canary.svg" alt="Canary" fill />
    </section>
  );
};
