import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

export const OauthCard = () => {
  return (
    <Link
      className={styles.card}
      href="https://www.figma.com/file/2VdpF0IhNz4CTdi7JEaGzH/canary-lab?type=design&node-id=13%3A300&mode=design&t=xrw7uUOSeqeBGx9O-1"
      target="_blank"
      rel="noopener noreferrer"
      passHref
    >
      <h6>Oauth</h6>
      <div className={styles.link}>
        <Image
          src="/assets/tech/nextjs.svg"
          alt="Next.js"
          width={80}
          height={80}
        />
      </div>
      <p>Login</p>
    </Link>
  );
};
