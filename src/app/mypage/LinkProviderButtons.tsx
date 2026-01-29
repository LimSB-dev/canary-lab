"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useTranslation } from "@/hooks/useTranslation";

const AVAILABLE_PROVIDERS = ["github", "google", "apple", "naver", "kakao"] as const;

const ACCOUNT_LINK_EMAIL_COOKIE = "canary_account_link_email";
const COOKIE_MAX_AGE = 60 * 5; // 5분

type ProviderId = (typeof AVAILABLE_PROVIDERS)[number];

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
  const unlinked = AVAILABLE_PROVIDERS.filter((p) => !linkedSet.has(p));

  if (unlinked.length === 0) return null;

  const handleLink = (provider: ProviderId) => {
    setAccountLinkCookie(currentUserEmail);
    signIn(provider, { redirectTo: "/mypage" });
  };

  return (
    <div className={s.link_section}>
      <h2 className={s.link_title}>{t("mypage.linkSectionTitle")}</h2>
      <p className={s.link_desc}>{t("mypage.linkSectionDesc")}</p>
      <div className={s.link_buttons}>
        {unlinked.map((provider) => (
          <button
            key={provider}
            type="button"
            className={s.link_button}
            onClick={() => handleLink(provider)}
          >
            {t(`main.providers.${provider}`)} {t("mypage.linkAdd")}
          </button>
        ))}
      </div>
    </div>
  );
}
