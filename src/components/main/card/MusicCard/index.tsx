"use client";

import { ImageCardShadow } from "..";
import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

export const MusicCard = () => {
  const { t } = useTranslation();
  return (
    <article className={styles.card}>
      <ImageCardShadow />
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/sWtEYPva4A0?si=3ZguOBbVWGyS32vj&amp;controls=0`}
        title={t("main.musicCard.youtubeTitle")}
        frameBorder={0}
        allowFullScreen
      />
    </article>
  );
};
