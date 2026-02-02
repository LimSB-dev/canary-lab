"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import { ImageCardShadow } from "@/components/main/card/ImageCardShadow";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setLocale, selectLocale } from "@/store/modules/language";
import { getSupportedLocales, getLanguageNativeName } from "@/utils/i18n";
import type { Locale } from "@/store/modules/language";

export const LanguageCard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLocale = useAppSelector(selectLocale);
  const supportedLocales = getSupportedLocales();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = currentLocale;
    }
  }, [currentLocale]);

  const handleSelectLocale = async (locale: Locale) => {
    dispatch(setLocale(locale));
    if (status === "authenticated" && session?.user?.email) {
      try {
        await fetch("/api/users/locale", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale }),
        });
      } catch {
        // 저장 실패 시 Redux는 이미 반영됨
      }
    }
  };

  return (
    <article className={styles.card}>
      <h5 className={styles.title}>{t("main.languageCard.title")}</h5>
      <ImageCardShadow canClick={false} />
      <Image
        src="/assets/images/earth.png"
        alt={t("main.languageCard.altLanguages")}
        width={500}
        height={500}
        className={styles.image}
      />
      <div className={styles.language_section}>
        <p className={styles.language_label}>{t("main.languageCard.selectLanguage")}</p>
        <ul
          className={styles.language_list}
          role="listbox"
          aria-label={t("main.languageCard.selectLanguage")}
        >
          {supportedLocales.map((locale) => (
            <li key={locale}>
              <button
                type="button"
                className={
                  currentLocale === locale ? styles.language_button_active : styles.language_button
                }
                onClick={() => handleSelectLocale(locale)}
                role="option"
                aria-selected={currentLocale === locale}
              >
                {getLanguageNativeName(locale)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
