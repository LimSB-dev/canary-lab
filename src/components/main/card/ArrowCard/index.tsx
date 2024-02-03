import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const ArrowCard = () => {
  return (
    <article id="arrow-card" className={styles.card}>
      <div id="arrow-left" role="button" className={styles.arrow}>
        <FontAwesomeIcon icon={faAngleLeft} size="xl" />
      </div>
      <div id="arrow-right" role="button" className={styles.arrow}>
        <FontAwesomeIcon icon={faAngleRight} size="xl" />
      </div>
    </article>
  );
};
