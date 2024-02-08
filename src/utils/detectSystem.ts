/**
 * Detects the theme of the user's system
 * @returns {'dark' | 'light'} The theme of the user's system
 */
const detectTheme = () => {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  return theme;
};

/**
 * Detects the language of the user's system
 * @returns {'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'ko' | 'pt' | 'ru' | 'zh'} The language of the user's system
 */
const detectLanguage = () => {
  const language = window.navigator.language;
  return language;
};

export { detectTheme, detectLanguage };
