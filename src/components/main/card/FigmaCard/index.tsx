import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";
import { META_DATA } from "@/constants/metadata";
import { ImageCardShadow } from "../ImageCardShadow";

export const FigmaCard = () => {
  return (
    <Link
      className={`button-card-shadow ${styles.card}`}
      href={META_DATA.FIGMA_URL}
      target="_blank"
      rel="noopener noreferrer"
      passHref
    >
      <h6>Figma</h6>
      <div className={styles.link}>
        <ImageCardShadow figure="circle" />
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
