"use client";

import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const SkeletonPostCard = () => {
  return (
    <div className={`button-card-shadow ${styles.card_resent}`}>
      <h6>title</h6>
      <div className={styles.item_footer}>
        <caption>{/* 날짜 */}</caption>
        <div className={styles.icon_container}>
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faEye} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPostCard;
