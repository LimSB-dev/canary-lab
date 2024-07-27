"use client";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";

import Image from "next/image";

import styles from "./styles.module.scss";
import { ImageCardShadow } from "@/components/main/card/ImageCardShadow";
import { auth } from "../../../../../auth";
import { Session } from "next-auth";

export const OauthCard = () => {
  let user = session?.user?.email;

  return user ? (
    <form
      className={`button-card-shadow ${styles.card}`}
      action={async () => {
        await signOut();
      }}
    >
      <h6>{user}</h6>
      <button className={styles.link} type="submit">
        <ImageCardShadow figure="circle" />
        <Image
          src="/assets/tech/nextjs.svg"
          alt="Next.js"
          width={80}
          height={80}
        />
      </button>
      <p>Sign Out</p>
    </form>
  ) : (
    <form
      className={`button-card-shadow ${styles.card}`}
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
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
    </form>
  );
};
