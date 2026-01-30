"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

interface IProps {
  size?: "small" | "medium" | "large";
  withText?: boolean;
}

const DefaultLogo = ({ size = "medium", withText }: IProps) => {
  const { t } = useTranslation();
  const logoSize = {
    small: { width: 24, height: 24 },
    medium: { width: 48, height: 48 },
    large: { width: 64, height: 64 },
  };

  return (
    <Link href="/" passHref className={styles.link}>
      <Image
        src="/favicon.ico"
        alt={t("common.logoAlt")}
        width={logoSize[size].width}
        height={logoSize[size].height}
      />
      {withText && <p>{t("common.home").toUpperCase()}</p>}
    </Link>
  );
};

export default DefaultLogo;
