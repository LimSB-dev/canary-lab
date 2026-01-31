"use client";

import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const SkeletonPostCard = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className={`button-card-shadow ${styles.card_resent}`}>
      <h6>Loading...</h6>
      <div className={styles.item_footer}>
        <span>{formattedDate}</span>
        <div className={styles.icon_container}>
          <div>
            <FontAwesomeIcon icon={faHeart} />0
          </div>
          <div>
            <FontAwesomeIcon icon={faEye} />0
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPostCard;
