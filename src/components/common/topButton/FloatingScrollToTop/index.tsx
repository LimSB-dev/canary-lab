"use client";

import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";

const FloatingScrollToTop = () => {
  const [isShow, setIsShow] = useState(false);
  const path = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  if (!isShow) {
    return null;
  }

  return (
    <div className={styles.floating_scroll_to_top_container}>
      <button
        type="button"
        className={`button-card-shadow ${styles.floating_scroll_to_top}`}
        onClick={scrollToTop}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    </div>
  );
};

export default FloatingScrollToTop;
