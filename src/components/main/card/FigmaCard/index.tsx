import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

export const FigmaCard = () => {
  return (
    <Link
      className={styles.card}
      href={process.env.NEXT_PUBLIC_FIGMA_LINK || "/"}
      target="_blank"
      rel="noopener noreferrer"
      passHref
    >
      <h6>Figma</h6>
      <div className={styles.link}>
        <Image
          src="/assets/tech/figma.svg"
          alt="Figma"
          width={32}
          height={48}
        />
      </div>
      <p>Design</p>
    </Link>
  );
};
