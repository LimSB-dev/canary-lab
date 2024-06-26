import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";
import { ImageCardShadow } from "@/components/main/card/ImageCardShadow";

export const OauthCard = () => {
  return (
    <Link
      className={`button-card-shadow ${styles.card}`}
      href="/login"
      rel="noopener noreferrer"
      passHref
    >
      <h6>Oauth</h6>
      <div className={styles.link}>
        <ImageCardShadow figure="circle" />
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
