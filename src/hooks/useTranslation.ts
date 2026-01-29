"use client";

import { useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { selectLocale } from "@/store/modules/language";
import { loadMessages, createT, type Messages } from "@/utils/i18n";
import { useEffect } from "react";

export function useTranslation() {
  const locale = useAppSelector(selectLocale);
  const [messages, setMessages] = useState<Messages | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadMessages(locale).then((m) => {
      if (!cancelled) setMessages(m);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const t = useMemo(() => (messages ? createT(messages) : (key: string) => key), [messages]);

  return { t, locale, isLoading: !messages };
}
