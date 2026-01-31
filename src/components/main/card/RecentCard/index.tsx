"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@/hooks/useTranslation";

export const RecentCard = () => {
  const { t } = useTranslation();
  return (
    <Link
      id="recent-posts-card"
      className={`card-shadow ${styles.card}`}
      href="/posts"
      passHref
    >
      <h6>
        {t("main.recentCard.recent")}
        <br />
        {t("main.recentCard.posts")}
      </h6>
      <p className={styles.link}>
        <span>{t("main.recentCard.more")}</span>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
      </p>
    </Link>
  );
};
