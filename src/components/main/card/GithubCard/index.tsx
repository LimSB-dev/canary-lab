import Link from "next/link";

import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";

export const GithubCard = () => {
  return (
    <Link
      className={styles.card}
      href="https://github.com/LimSB-dev"
      target="_blank"
      passHref
    >
      <h6>GitHub</h6>
      <div className={styles.link}>
        <FontAwesomeIcon icon={faGithub} size="5x" />
      </div>
      <p>
        Well
        <br />
        Documented
      </p>
    </Link>
  );
};
