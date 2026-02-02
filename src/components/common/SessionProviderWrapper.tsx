"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

interface SessionProviderWrapperProps {
  session: Session | null;
  children: React.ReactNode;
}

/**
 * useSession()을 쓰는 클라이언트 컴포넌트를 위해 서버에서 받은 session을 SessionProvider로 제공합니다.
 */
export function SessionProviderWrapper({ session, children }: SessionProviderWrapperProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
