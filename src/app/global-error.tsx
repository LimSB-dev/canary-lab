"use client";

import { DefaultTerminal } from "@/components/common/terminal";
import styles from "./page.module.scss";
import { ERROR_SEQUENCE } from "@/constants/sequence/sequence";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <main className={styles.main}>
      <DefaultTerminal
        redirect="/"
        title={error.message}
        command={{ key: "Escape", name: "ESC" }}
        sequence={ERROR_SEQUENCE}
      />
    </main>
  );
}
