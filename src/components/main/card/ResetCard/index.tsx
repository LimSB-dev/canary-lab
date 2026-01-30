"use client";

import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setResetFlag } from "@/store/modules/post";
import { useTranslation } from "@/hooks/useTranslation";

export const ResetCard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(setResetFlag());
  };

  return (
    <button
      aria-label={t("common.reset")}
      id="reset-card"
      type="button"
      className={`button-card-shadow ${styles.card}`}
      onClick={() => handleReset()}
    >
      <FontAwesomeIcon icon={faArrowsRotate} size="lg" />
    </button>
  );
};
