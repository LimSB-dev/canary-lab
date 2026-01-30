"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { DefaultLogo } from "@/components/common/logo";
import { useTranslation } from "@/hooks/useTranslation";

const CreateHeader = () => {
  const { t } = useTranslation();
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <DefaultLogo size="small" />
        <Link href="/posts">{t("posts.navPost").toUpperCase()}</Link>
      </section>
    </header>
  );
};

export default CreateHeader;
