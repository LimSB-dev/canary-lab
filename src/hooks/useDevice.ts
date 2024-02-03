import { BREAKPOINT } from "@/constant/breakpoint";
import { useEffect, useState } from "react";

export const useDevice = () => {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > BREAKPOINT.max) {
        setDevice("desktop");
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
