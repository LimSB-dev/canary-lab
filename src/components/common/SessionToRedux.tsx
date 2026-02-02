"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHook";
import { signIn, signOut } from "@/store/modules/user";
import { setLocale } from "@/store/modules/language";
import { detectLocale } from "@/utils/detectSystem";
import type { Session } from "next-auth";

const LOCALE_INITED_KEY = "canary_locale_inited";

interface SessionToReduxProps {
  session: Session | null;
}

/**
 * 로그인된 세션을 Redux에 반영하고, locale을 동기화합니다.
 * - 로그인: DB에 저장된 locale을 세션에서 읽어 Redux에 반영
 * - 비로그인 첫 방문: 브라우저 언어로 자동 매칭 후 세션스토리지에 초기화 플래그 저장
 */
export function SessionToRedux({ session }: SessionToReduxProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!session?.user?.email) {
      dispatch(signOut());
      // 비로그인: 첫 방문 시에만 브라우저 언어로 locale 설정
      if (typeof window !== "undefined" && !sessionStorage.getItem(LOCALE_INITED_KEY)) {
        const locale = detectLocale();
        dispatch(setLocale(locale));
        sessionStorage.setItem(LOCALE_INITED_KEY, "1");
      }
      return;
    }
    const u = session.user;
    dispatch(
      signIn({
        id: u.id ?? null,
        name: u.name ?? null,
        email: u.email ?? null,
        image: u.image ?? null,
        userType: u.userType ?? "normal",
        providers: u.providers ?? [],
        currentProvider: u.currentProvider ?? null,
      })
    );
    if (u.locale === "ko" || u.locale === "en") {
      dispatch(setLocale(u.locale));
    }
  }, [session, dispatch]);

  return null;
}
