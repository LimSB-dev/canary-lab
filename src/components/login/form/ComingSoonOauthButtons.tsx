"use client";

import { useTranslation } from "@/hooks/useTranslation";

import styles from "./styles.module.scss";

const COMING_SOON_PROVIDERS = ["apple", "naver", "kakao"] as const;

export default function ComingSoonOauthButtons() {
  const { t } = useTranslation();

  return (
    <>
      {COMING_SOON_PROVIDERS.map((provider) => (
        <span key={provider} className={styles.tooltip_wrapper} title={t("common.comingSoon")}>
          <button className={styles.button} type="button" disabled aria-disabled="true">
            {t(`main.providers.${provider}`)}
          </button>
        </span>
      ))}
    </>
  );
}

