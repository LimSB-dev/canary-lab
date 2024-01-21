import Image from "next/image";
import styles from "./styles.module.scss";

export const LanguageCard = () => {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>Multilingual Support</h2>
      <Image
        src="/assets/images/earth.png"
        alt="Languages"
        width={500}
        height={500}
        className={styles.image}
      />
    </article>
  );
};
