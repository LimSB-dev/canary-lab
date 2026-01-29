"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { LinkProviderButtons } from "./LinkProviderButtons";
import { AvatarChange } from "./AvatarChange";
import { GoToMainLink } from "./GoToMainLink";
import type { Session } from "next-auth";
import styles from "./page.module.scss";

interface MypageContentProps {
  session: Session;
}

export function MypageContent({ session }: MypageContentProps) {
  const { t } = useTranslation();
  const { name, email, image, providers, currentProvider } = session.user;

  const currentLabel = currentProvider
    ? t(`main.providers.${currentProvider}`)
    : null;
  const linkedList =
    providers?.length
      ? providers.map((p) => t(`main.providers.${p}`)).join(", ")
      : null;

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <GoToMainLink className={styles.go_to_main} />
      </nav>
      <section className={styles.section}>
        <h6 className={styles.title}>{t("mypage.title")}</h6>
        <div className={styles.profile}>
          <AvatarChange
            currentUserEmail={email ?? ""}
            currentImage={image ?? null}
            styles={styles}
          />
          <dl className={styles.info}>
            <dt>{t("mypage.name")}</dt>
            <dd>{name ?? "-"}</dd>
            <dt>{t("mypage.email")}</dt>
            <dd>{email ?? "-"}</dd>
            {currentLabel && (
              <>
                <dt>{t("mypage.currentLogin")}</dt>
                <dd>{currentLabel}</dd>
              </>
            )}
            {linkedList && (
              <>
                <dt>{t("mypage.linkedAccounts")}</dt>
                <dd>{linkedList}</dd>
              </>
            )}
          </dl>
        </div>

        <LinkProviderButtons
          linkedProviders={providers ?? []}
          currentUserEmail={email ?? ""}
          styles={styles}
        />
      </section>
    </main>
  );
}
