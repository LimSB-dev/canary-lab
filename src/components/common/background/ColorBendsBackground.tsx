"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { detectTheme } from "@/utils/detectSystem";
import ColorBends from "./ColorBends";

/** 라이트 모드: 흰 배경에 어울리는 부드러운 톤 */
const LIGHT_COLORS = [
  "#fff9db",
  "#fff3bf",
  "#ffec99",
  "#ffe8a3",
];

/** 다크 모드: 어두운 배경에 어울리는 밝은 톤 */
const DARK_COLORS = [
  "#1a1a1a",
  "#202020",
  "#2a240f",
  "#3a320f",
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
      rotation={30}
      speed={0.08}
      transparent
      scale={1.4}
      frequency={0.6}
      warpStrength={0.55}
      mouseInfluence={0.2}
      parallax={0.08}
      noise={0.02}
    />
  );
}
