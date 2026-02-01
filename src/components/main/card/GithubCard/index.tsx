import Link from "next/link";

import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { ImageCardShadow } from "@/components/main/card/ImageCardShadow";

export const GithubCard = () => {
  return (
    <Link
      className={`button-card-shadow-no-blur ${styles.card}`}
      href="https://github.com/LimSB-dev"
      target="_blank"
      passHref
    >
      <h6>GitHub</h6>
      <div className={styles.link}>
        <ImageCardShadow figure="circle" />
        <FontAwesomeIcon icon={faGithub} size="6x" />
      </div>
      <p>
        Well
        <br />
        Documented
      </p>
    </Link>
  );
};
