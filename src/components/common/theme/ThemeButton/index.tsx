"use client";

import { useEffect, useMemo } from "react";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import {
  setThemeWhenSystemChange,
  setThemeWhenToggleClick,
} from "@/store/modules/theme";
import { detectTheme } from "@/utils/detectSystem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faDesktop,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

interface IProps {
  buttonType: Theme;
}

const ThemeButton = ({ buttonType }: IProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const active = useMemo<boolean>(() => {
    return theme === buttonType;
  }, [theme, buttonType]);

  let icon: IconDefinition | null = null;

  switch (buttonType) {
    case "system":
      icon = faDesktop;
      break;
    case "light":
      icon = faSun;
      break;
    case "dark":
      icon = faMoon;
      break;
  }

  const themeToggle = () => {
    dispatch(setThemeWhenToggleClick(buttonType));
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      dispatch(setThemeWhenSystemChange(detectTheme()));
    });

  useEffect(() => {
    const nextTheme = theme === "system" ? detectTheme() : theme;
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, [theme]);

  return (
    <button
      className={`${active ? styles.active : styles.inactive}`}
      disabled={active}
      onClick={themeToggle}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default ThemeButton;
