import Image from "next/image";

import styles from "./styles.module.scss";

export const ProfileCard = () => {
  return (
    <article className={styles.card}>
      <Image
        src="/assets/images/memoji.png"
        alt="profile"
        width={200}
        height={200}
      />
    </article>
  );
};
