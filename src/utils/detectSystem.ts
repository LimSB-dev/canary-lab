/**
 * Detects the theme of the user's system
 * @returns {'dark' | 'light'} The theme of the user's system
 */
const detectTheme = () => {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  return theme;
};

/**
 * Detects the raw language tag from the browser (e.g. 'ko-KR', 'en-US').
 */
const detectLanguage = () => {
  const language = window.navigator.language;
  return language;
};

import type { Locale } from "@/store/modules/language";

/**
 * 브라우저 언어/지역에 따라 지원 locale(ko | en)으로 매핑합니다.
 * navigator.language 또는 navigator.languages[0] 사용.
 */
function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const lang = window.navigator.language ?? window.navigator.languages?.[0] ?? "en";
  const primary = lang.split("-")[0].toLowerCase();
  if (primary === "ko") return "ko";
  return "en";
}

export { detectTheme, detectLanguage, detectLocale };
