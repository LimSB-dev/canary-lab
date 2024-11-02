import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setOffset } from "@/store/modules/post";

export const ArrowCard = () => {
  const dispatch = useAppDispatch();

  const handleArrow = (type: "prev" | "next") => {
    switch (type) {
      case "prev":
        dispatch(setOffset(-1));
        break;
      case "next":
        dispatch(setOffset(1));
    }
  };
  return (
    <article id="arrow-card" className={`button-card-shadow ${styles.card}`}>
      <button
        id="arrow-left"
        type="button"
        className={styles.arrow}
        onClick={() => handleArrow("prev")}
      >
        <FontAwesomeIcon icon={faAngleLeft} size="xl" />
      </button>
      <button
        id="arrow-right"
        type="button"
        className={styles.arrow}
        onClick={() => handleArrow("next")}
      >
        <FontAwesomeIcon icon={faAngleRight} size="xl" />
      </button>
    </article>
  );
};
