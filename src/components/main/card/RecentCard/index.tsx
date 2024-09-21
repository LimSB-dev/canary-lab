import Link from "next/link";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export const RecentCard = () => {
  return (
    <Link
      id="recent-posts-card"
      className={`card-shadow ${styles.card}`}
      href="/posts"
      passHref
    >
      <h6>
        Recent
        <br />
        Posts
      </h6>
      <p className={styles.link}>
        <p>more</p>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
      </p>
    </Link>
  );
};
