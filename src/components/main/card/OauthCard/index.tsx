"use client";

import Image from "next/image";

import styles from "./styles.module.scss";
import { ImageCardShadow } from "@/components/main/card/ImageCardShadow";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { signOut } from "@/store/modules/user";

export const OauthCard = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return user.name && user.email && user.image ? (
    <form
      className={`button-card-shadow ${styles.card}`}
      action={() => {
        dispatch(signOut());
      }}
    >
      <h6>{user.name}</h6>
      <div className={styles.link}>
        <ImageCardShadow figure="circle" />

        <Image src={user.image} alt={user.name} width={80} height={80} />
      </div>
      <button className={styles.sign_out_button} type="submit">
        Sign Out
      </button>
    </form>
  ) : (
    <Link className={`button-card-shadow ${styles.card}`} href={"login"}>
      <h6>Oauth</h6>
      <button className={styles.link} type="submit">
        <ImageCardShadow figure="circle" />
        <Image
          src="/assets/tech/nextjs.svg"
          alt="Next.js"
          width={80}
          height={80}
        />
      </button>
      <p>Login</p>
    </Link>
  );
};
