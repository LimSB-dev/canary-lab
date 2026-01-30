"use client";

import styles from "./page.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

const SkeletonPostDetail = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className={styles.title}>{t("posts.nowLoading")}</h1>
      <p>{t("posts.pleaseWait")}</p>
    </>
  );
};

export default function PostDetailPageLoading() {
  return (
    <main id="main-page" role="main" className={styles.main}>
      <SkeletonPostDetail />
    </main>
  );
}
