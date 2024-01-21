"use client";

import styles from "./styles.module.scss";

export const ThemeToggleCard = ({ theme }: { theme: "light" | "dark" }) => {
  const themeToggle = () => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <article
      className={theme === "light" ? styles.card_light : styles.card_dark}
      onClick={themeToggle}
    >
      <h2 className={theme === "light" ? styles.text_light : styles.text_dark}>
        {theme.toUpperCase()}
      </h2>
    </article>
  );
};
