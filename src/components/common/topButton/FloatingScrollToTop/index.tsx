"use client";

import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const FloatingScrollToTop = () => {
  const [isShow, setIsShow] = useState(false);

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

  if (!isShow) {
    return null;
  }

  return (
    <div className={styles.floating_scroll_to_top_container}>
      <button
        type="button"
        className={styles.floating_scroll_to_top}
        onClick={scrollToTop}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    </div>
  );
};

export default FloatingScrollToTop;
