import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export const ResetCard = () => {
  return (
    <button
      id="reset-card"
      type="button"
      className={`button-card-shadow ${styles.card}`}
    >
      <FontAwesomeIcon icon={faArrowsRotate} size="lg" />
    </button>
  );
};
