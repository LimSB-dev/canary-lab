import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

export const OauthCard = () => {
  return (
    <article className={styles.card}>
      <h6>Oauth</h6>
      <Link
        href="https://www.figma.com/file/2VdpF0IhNz4CTdi7JEaGzH/canary-lab?type=design&node-id=13%3A300&mode=design&t=xrw7uUOSeqeBGx9O-1"
        target="_blank"
        rel="noopener noreferrer"
        passHref
      >
        <Image
          src="/assets/tech/nextjs.svg"
          alt="Next.js"
          width={80}
          height={80}
        />
      </Link>
      <p>Login</p>
    </article>
  );
};
