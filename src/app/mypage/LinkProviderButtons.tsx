"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useTranslation } from "@/hooks/useTranslation";

const PROVIDERS = [
  { id: "github", enabled: true },
  { id: "google", enabled: true },
  { id: "apple", enabled: false },
  { id: "naver", enabled: false },
  { id: "kakao", enabled: false },
] as const;

const ACCOUNT_LINK_EMAIL_COOKIE = "canary_account_link_email";
const COOKIE_MAX_AGE = 60 * 5; // 5분

type ProviderId = (typeof PROVIDERS)[number]["id"];

interface LinkProviderButtonsProps {
  linkedProviders: string[];
  currentUserEmail: string;
  styles: Record<string, string>;
}

function setAccountLinkCookie(email: string) {
  document.cookie = `${ACCOUNT_LINK_EMAIL_COOKIE}=${encodeURIComponent(email)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function clearAccountLinkCookie() {
  document.cookie = `${ACCOUNT_LINK_EMAIL_COOKIE}=; path=/; max-age=0`;
}

export function LinkProviderButtons({
  linkedProviders,
  currentUserEmail,
  styles: s,
}: LinkProviderButtonsProps) {
  const { t } = useTranslation();
  useEffect(() => {
    clearAccountLinkCookie();
  }, []);

  const linkedSet = new Set(linkedProviders);
  const unlinked = PROVIDERS.filter((p) => !linkedSet.has(p.id));

  if (unlinked.length === 0) return null;

  const handleLink = (provider: ProviderId) => {
    setAccountLinkCookie(currentUserEmail);
    signIn(provider, { redirectTo: "/mypage" });
  };

  return (
    <div className={s.link_section}>
      <h6 className={s.link_title}>{t("mypage.linkSectionTitle")}</h6>
      <p className={s.link_desc}>{t("mypage.linkSectionDesc")}</p>
      <div className={s.link_buttons}>
        {unlinked.map(({ id, enabled }) => {
          const label = `${t(`main.providers.${id}`)} ${t("mypage.linkAdd")}`;
          if (!enabled) {
            return (
              <span key={id} title={t("common.comingSoon")}>
                <button type="button" className={s.link_button} disabled aria-disabled="true">
                  {label}
                </button>
              </span>
            );
          }
          return (
            <button key={id} type="button" className={s.link_button} onClick={() => handleLink(id)}>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
