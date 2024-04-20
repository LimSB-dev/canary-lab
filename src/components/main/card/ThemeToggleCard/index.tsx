"use client";

import {
  setThemeWhenToggleClick,
  setThemeWhenSystemChange,
} from "@/store/modules/theme";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { useEffect } from "react";
import { detectTheme } from "@/utils/detectSystem";

export const ThemeToggleCard = ({ theme }: { theme: "light" | "dark" }) => {
  const dispatch = useAppDispatch();
  const curTheme = useAppSelector((state) => state.theme.theme);

  const themeToggle = () => {
    dispatch(setThemeWhenToggleClick(theme));
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      dispatch(setThemeWhenSystemChange(detectTheme()));
    });

  useEffect(() => {
    const nextTheme = curTheme === "system" ? detectTheme() : curTheme;
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, [curTheme]);

  return (
    <button
      className={`${theme === "light" ? styles.card_light : styles.card_dark} ${
        curTheme === theme
          ? `card-shadow ${styles.default}`
          : "button-card-shadow"
      }`}
      onClick={themeToggle}
      disabled={curTheme === theme}
    >
      <h6 className={theme === "light" ? styles.text_light : styles.text_dark}>
        {theme.toUpperCase()}
      </h6>
    </button>
  );
};
