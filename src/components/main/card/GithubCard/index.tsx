import Link from "next/link";

import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";

export const GithubCard = () => {
  return (
    <article className={styles.card}>
      <h6>GitHub</h6>
      <Link
        href="https://github.com/LimSB-dev"
        target="_blank"
        className={styles.link}
        passHref
      >
        <FontAwesomeIcon icon={faGithub} size="5x" />
      </Link>
      <p>
        Well
        <br />
        Documented
      </p>
    </article>
  );
};
