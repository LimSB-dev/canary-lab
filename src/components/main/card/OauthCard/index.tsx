"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";
import { ImageCardShadow } from "@/components/main/card/ImageCardShadow";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { signOut } from "@/store/modules/user";
import { useTranslation } from "@/hooks/useTranslation";

export const OauthCard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm(t("login.confirmSignOut"))) {
      dispatch(signOut());
    }
  };

  const isLoggedIn = user.name && user.email && user.image;

  return isLoggedIn ? (
    <div className={`button-card-shadow ${styles.card}`}>
      <Link href="/mypage" className={styles.action_link}>
        {t("main.oauthCard.myPage")}
      </Link>
      <div className={styles.link}>
        <ImageCardShadow figure="circle" />
        <Image src={user.image} alt={user.name} width={80} height={80} />
      </div>
      <button
        type="button"
        className={styles.sign_out_button}
        onClick={handleSignOut}
      >
        {t("common.signOut")}
      </button>
    </div>
  ) : (
    <Link className={`button-card-shadow ${styles.card}`} href="/login">
      <h6>{t("main.oauthCard.oauth")}</h6>
      <div className={styles.link}>
        <ImageCardShadow figure="circle" />
        <Image
          src="/assets/tech/nextjs.svg"
          alt={t("main.oauthCard.nextJsAlt")}
          width={80}
          height={80}
        />
      </div>
      <p>{t("common.login")}</p>
    </Link>
  );
};
