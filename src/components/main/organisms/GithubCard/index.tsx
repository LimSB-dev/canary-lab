import Link from "next/link";

import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";

export const GithubCard = () => {
  return (
    <article className={styles.card}>
      <h4>GitHub</h4>
      <Link
        href="https://github.com/LimSB-dev"
        target="_blank"
        className={styles.link}
      >
        <FontAwesomeIcon icon={faGithub} size="5x" />
      </Link>
      <h5>
        Well
        <br />
        Documented
      </h5>
    </article>
  );
};
