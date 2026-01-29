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
  const providerLabel = user.currentProvider
    ? t(`main.providers.${user.currentProvider}`)
    : null;
  const linkedLabels =
    user.providers?.length > 0
      ? user.providers.map((p) => t(`main.providers.${p}`)).join(", ")
      : null;

  return isLoggedIn ? (
    <div className={`button-card-shadow ${styles.card}`}>
      <Link href="/mypage" className={styles.card_heading}>
        {t("main.oauthCard.myPage")}
      </Link>
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
      {providerLabel && (
        <p className={styles.card_footer}>
          {providerLabel} {t("main.oauthCard.loggedInWith")}
        </p>
      )}
      {linkedLabels && (
        <p className={styles.card_footer}>
          {t("main.oauthCard.linkedAccounts")}: {linkedLabels}
        </p>
      )}
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
      <span className={styles.card_heading}>{t("common.login")}</span>
      <div className={styles.link}>
        <ImageCardShadow figure="circle" />
        <Image
          src="/assets/tech/nextjs.svg"
          alt={t("main.oauthCard.nextJsAlt")}
          width={80}
          height={80}
        />
      </div>
      <p className={styles.card_footer}>{t("main.oauthCard.oauth")}</p>
    </Link>
  );
};
