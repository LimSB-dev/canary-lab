"use client";

import Image from "next/image";

import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

export const ProfileCard = () => {
  const { t } = useTranslation();
  return (
    <article className={styles.card}>
      <Image
        src="/assets/images/memoji.png"
        alt={t("main.profileCard.alt")}
        width={200}
        height={200}
      />
    </article>
  );
};
