"use client";

import { ImageCardShadow } from "..";
import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

const YOUTUBE_VIDEO_ID = "sWtEYPva4A0";

/** 컨트롤 표시, 음소거 없음. 사용자가 재생 버튼으로 들을 수 있음. */
const embedSrc = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?controls=1&rel=0`;

export const MusicCard = () => {
  const { t } = useTranslation();
  return (
    <article className={styles.card}>
      {/* <ImageCardShadow /> */}
      <iframe
        width="100%"
        height="100%"
        src={embedSrc}
        title={t("main.musicCard.youtubeTitle")}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </article>
  );
};
