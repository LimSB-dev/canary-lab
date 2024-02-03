"use client";

import { setTheme } from "@/store/modules/theme";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { useEffect } from "react";

export const ThemeToggleCard = ({ theme }: { theme: "light" | "dark" }) => {
  const dispatch = useAppDispatch();
  const curTheme = useAppSelector((state) => state.theme.theme);

  const themeToggle = () => {
    dispatch(setTheme(theme));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", curTheme);
  }, [curTheme]);

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
