"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHook";
import { signIn, signOut } from "@/store/modules/user";
import type { Session } from "next-auth";

interface SessionToReduxProps {
  session: Session | null;
}

/**
 * 로그인된 세션을 Redux에 반영해 OauthCard·CommentForm 등에서 최신 이미지/정보가 보이도록 합니다.
 */
export function SessionToRedux({ session }: SessionToReduxProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!session?.user?.email) {
      dispatch(signOut());
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
  }, [session, dispatch]);

  return null;
}
