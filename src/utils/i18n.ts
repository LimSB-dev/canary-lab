import type { Locale } from "@/store/modules/language";

export type Messages = typeof import("@/locales/ko.json");

const messageModules: Record<string, () => Promise<{ default: Messages }>> = {
  ko: () => import("@/locales/ko.json"),
  en: () => import("@/locales/en.json"),
};

const supportedLocales = ["ko", "en"] as const;
const fallbackLocale: Locale = "en";

/** UX: 언어 칩에는 현재 locale 번역이 아닌, 각 언어의 원어(네이티브) 표기가 표시됩니다. */
const languageNativeNames: Record<string, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
  cn: "中文",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
  ru: "Русский",
};

export function getSupportedLocales(): readonly Locale[] {
  return supportedLocales as unknown as Locale[];
}

/** 언어 코드에 해당하는 원어(네이티브) 표기. 언어 선택 칩 UX용. */
export function getLanguageNativeName(locale: string): string {
  return languageNativeNames[locale] ?? locale;
}

export function resolveLocale(locale: Locale): "ko" | "en" {
  const resolved = (supportedLocales as readonly string[]).includes(locale)
    ? (locale as "ko" | "en")
    : fallbackLocale;
  return resolved as "ko" | "en";
}

/**
 * Nested key path to value (e.g. "main.languageCard.title" -> messages.main.languageCard.title)
 */
function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

export function createT(messages: Messages) {
  return function t(key: string): string {
    const value = getNested(messages as unknown as Record<string, unknown>, key);
    return value ?? key;
  };
}

export async function loadMessages(locale: Locale): Promise<Messages> {
  const resolved = resolveLocale(locale);
  const load = messageModules[resolved];
  if (!load) {
    const en = messageModules.en;
    return (await en()).default;
  }
  const mod = await load();
  return mod.default;
}
