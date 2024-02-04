import { BREAKPOINT } from "@/constants/breakpoint";
import { useEffect, useState } from "react";

/**
 * find the current device with window.innerWidth
 * @returns {string} "max" | "desktop" | "laptop" | "tablet" | "mobile" | "min"
 */
export const useDevice = () => {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > BREAKPOINT.max) {
        setDevice("max");
      } else if (window.innerWidth > BREAKPOINT.desktop) {
        setDevice("desktop");
      } else if (window.innerWidth > BREAKPOINT.laptop) {
        setDevice("laptop");
      } else if (window.innerWidth > BREAKPOINT.tablet) {
        setDevice("tablet");
      } else if (window.innerWidth > BREAKPOINT.mobile) {
        setDevice("mobile");
      } else {
        setDevice("min");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
};
