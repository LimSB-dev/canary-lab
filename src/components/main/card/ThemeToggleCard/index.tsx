"use client";

import { setTheme } from "@/store/modules/theme";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";

export const ThemeToggleCard = ({ theme }: { theme: "light" | "dark" }) => {
  const dispatch = useAppDispatch();
  const curTheme = useAppSelector((state) => state.theme.theme);

  const themeToggle = () => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      dispatch(setTheme("light"));
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      dispatch(setTheme("dark"));
    }
  };

  return (
    <button
      className={theme === "light" ? styles.card_light : styles.card_dark}
      onClick={themeToggle}
      disabled={curTheme === theme}
    >
      <h2 className={theme === "light" ? styles.text_light : styles.text_dark}>
        {theme.toUpperCase()}
      </h2>
    </button>
  );
};
