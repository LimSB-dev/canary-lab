import Link from "next/link";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export const RecentCard = () => {
  return (
    <article id="recent-posts-card" className={styles.card}>
      <h2>
        Recent
        <br />
        Posts
      </h2>
      <Link className={styles.link} href="/posts" passHref>
        <h3>more</h3>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </Link>
    </article>
  );
};
