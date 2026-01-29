"use client";

import Image from "next/image";

import styles from "./styles.module.scss";
import { ImageCardShadow } from "@/components/main/card/ImageCardShadow";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { signOut } from "@/store/modules/user";
import { useTranslation } from "@/hooks/useTranslation";

export const OauthCard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleSignOut = () => {
    if (confirm(t("login.confirmSignOut"))) {
      dispatch(signOut());
    }
  };

  return user.name && user.email && user.image ? (
    <form
      className={`button-card-shadow ${styles.card}`}
      onClick={() => {
        handleSignOut();
      }}
    >
      <h6>{user.name}</h6>
      <div className={styles.link}>
        <ImageCardShadow figure="circle" />

        <Image src={user.image} alt={user.name} width={80} height={80} />
      </div>
      <button className={styles.sign_out_button}>{t("common.signOut")}</button>
    </form>
  ) : (
    <Link className={`button-card-shadow ${styles.card}`} href={"login"}>
      <h6>{t("main.oauthCard.oauth")}</h6>
      <button className={styles.link} type="submit">
        <ImageCardShadow figure="circle" />
        <Image
          src="/assets/tech/nextjs.svg"
          alt={t("main.oauthCard.nextJsAlt")}
          width={80}
          height={80}
        />
      </button>
      <p>{t("common.login")}</p>
    </Link>
  );
};
