"use client";

import { useTranslation } from "@/hooks/useTranslation";

export const SkeletonCard = () => {
  const { t } = useTranslation();
  return <div className={`card-shadow`}>{t("main.skeletonCard.index")}</div>;
};
