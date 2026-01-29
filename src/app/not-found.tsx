"use client";

import styles from "./not-found.module.scss";
import { DefaultTerminal } from "@/components/common/terminal";
import { NOT_FOUND_SEQUENCE } from "@/constants/sequence/sequence";
import { useTranslation } from "@/hooks/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className={styles.main}>
      <DefaultTerminal
        redirect="/"
        title={t("notFound.title")}
        command={{ key: "Escape", name: "ESC" }}
        sequence={NOT_FOUND_SEQUENCE}
      />
    </main>
  );
}
