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

  const isLoggedIn = user.name && user.email;

  return isLoggedIn ? (
    <div className={styles.card_container}>
      <Link href="/mypage" className={`button-card-shadow ${styles.card_oauth}`}>
        <p>{t("main.oauthCard.myPage")}</p>
        <div className={styles.link}>
          <ImageCardShadow figure="circle" />
          {user.image ? (
            <Image src={user.image} alt={user.name ?? t("common.user")} width={80} height={80} />
          ) : (
            <span className={styles.avatar_fallback}>
              {(user.name || user.email || "U")[0].toUpperCase()}
            </span>
          )}
        </div>
      </Link>
      <div className={`button-card-shadow ${styles.card_sign_out}`}>
        <button type="button" className={styles.sign_out_button} onClick={handleSignOut}>
          {t("common.signOut")}
        </button>
      </div>
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
