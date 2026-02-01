"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { detectTheme } from "@/utils/detectSystem";
import ColorBends from "./ColorBends";

/** 라이트 모드: 흰 배경에 어울리는 부드러운 톤 */
const LIGHT_COLORS = [
  "#ffe169", // 초록
  "#edc531", // 노랑
  "#c9a227", // 노랑
  "#b69121", // 빨강
];

/** 다크 모드: 어두운 배경에 어울리는 밝은 톤 */
const DARK_COLORS = [
  "#fff555", // primary
  "#fff777", // primary-light
  "#b8860b", // 골드 악센트
  "#f4e409", // primary-dark
];

export default function ColorBendsBackground() {
  const theme = useAppSelector((state) => state.theme.theme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const effective = theme === "system" ? detectTheme() : theme;
    setResolvedTheme(effective);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handle = () => setResolvedTheme(mq.matches ? "dark" : "light");
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, [theme]);

  const colors = resolvedTheme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  return (
    <ColorBends
      colors={colors}
      rotation={45}
      speed={0.2}
      transparent
      scale={1}
      frequency={1}
      warpStrength={1}
      mouseInfluence={1}
      parallax={0.5}
      noise={0.1}
    />
  );
}
