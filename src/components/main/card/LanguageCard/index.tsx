import Image from "next/image";
import styles from "./styles.module.scss";
import { ImageCardShadow } from "@/components/main/card/ImageCardShadow";

export const LanguageCard = () => {
  return (
    <article className={styles.card}>
      <h5 className={styles.title}>Multilingual Support</h5>
      <ImageCardShadow canClick={false} />
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
