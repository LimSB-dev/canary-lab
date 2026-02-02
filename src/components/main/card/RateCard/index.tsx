"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import styles from "./styles.module.scss";
import { ImageCardShadow } from "..";
import { useTranslation } from "@/hooks/useTranslation";

export const RateCard = () => {
  const { t } = useTranslation();
  const svgFile = "https://mazassumnida.wtf/api/v2/generate_badge?boj=clim03087";

  return (
    <Link
      href="https://solved.ac/clim03087"
      target="_blank"
      rel="noopener noreferrer"
      className={`button-card-shadow ${styles.card}`}
      passHref
    >
      <ImageCardShadow />
      <img className={styles.img} src={svgFile} alt={t("main.rateCard.solvedAcAlt")} />
    </Link>
  );
};
