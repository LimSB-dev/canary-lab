"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { selectLocale } from "@/store/modules/language";

/**
 * Redux에 저장된 locale을 document.documentElement.lang에 동기화합니다.
 */
export function SyncHtmlLang() {
  const locale = useAppSelector(selectLocale);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
