"use client";

import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

export const NameCard = () => {
  const { t } = useTranslation();
  return (
    <article className={`card-shadow ${styles.card}`}>
      <h5>{t("main.nameCard.name")}</h5>
    </article>
  );
};
