"use client";

import styles from "./page.module.scss";
import { DefaultTerminal } from "@/components/common/terminal";
import { NOT_FOUND_SEQUENCE } from "@/constants/sequence/sequence";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <DefaultTerminal
        redirect="/"
        title="404 Not Found"
        command={{ key: "Escape", name: "ESC" }}
        sequence={NOT_FOUND_SEQUENCE}
      />
    </main>
  );
}
