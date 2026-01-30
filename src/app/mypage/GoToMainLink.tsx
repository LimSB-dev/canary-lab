"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

interface GoToMainLinkProps {
  className?: string;
}

export function GoToMainLink({ className }: GoToMainLinkProps) {
  const { t } = useTranslation();
  return (
    <Link href="/" className={className}>
      {t("mypage.goToMain")}
    </Link>
  );
}
