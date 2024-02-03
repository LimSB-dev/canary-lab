import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

export const FigmaCard = () => {
  return (
    <article className={styles.card}>
      <h6>Figma</h6>
      <Link
        href="https://www.figma.com/file/2VdpF0IhNz4CTdi7JEaGzH/canary-lab?type=design&node-id=13%3A300&mode=design&t=xrw7uUOSeqeBGx9O-1"
        target="_blank"
        rel="noopener noreferrer"
        passHref
        className={styles.link}
      >
        <Image
          src="/assets/tech/figma.svg"
          alt="Figma"
          width={32}
          height={48}
        />
      </Link>
      <p>Design</p>
    </article>
  );
};
