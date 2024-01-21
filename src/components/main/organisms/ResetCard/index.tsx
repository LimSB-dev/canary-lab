"use client";

import { useState } from "react";
import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export const ResetCard = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <article
      id="reset-card"
      className={styles.card}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <FontAwesomeIcon icon={faArrowsRotate} size="lg" shake={isHover} />
    </article>
  );
};
