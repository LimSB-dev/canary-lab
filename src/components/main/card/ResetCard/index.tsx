"use client";

import { useState } from "react";
import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export const ResetCard = () => {
  return (
    <article id="reset-card" className={styles.card}>
      <FontAwesomeIcon icon={faArrowsRotate} size="lg" />
    </article>
  );
};
