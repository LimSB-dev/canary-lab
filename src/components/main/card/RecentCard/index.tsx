import Link from "next/link";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export const RecentCard = () => {
  return (
    <article id="recent-posts-card" className={`card-shadow ${styles.card}`}>
      <h6>
        Recent
        <br />
        Posts
      </h6>
      <Link className={styles.link} href="/posts" passHref>
        <p>more</p>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
      </Link>
    </article>
  );
};
