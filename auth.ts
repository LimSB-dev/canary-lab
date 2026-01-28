import NextAuth from "next-auth";
import Apple from "next-auth/providers/apple";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import Kakao from "next-auth/providers/kakao";
import { authConfig } from "./auth.config";
import { sql } from "@vercel/postgres";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [GitHub, Apple, Google, Naver, Kakao],
  callbacks: {
    async signIn({ user }) {
      try {
        // 사용자 로그인 처리
        return true;
      } catch (error) {
        console.error("Error handling signIn:", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        // 이메일이 없으면 세션을 반환하지 않음
        if (!session?.user?.email) {
          console.error("Session callback - No email in session:", session);
          return session;
        }

        const userEmail = session.user.email;
        const userName = session.user.name || "Unknown";
        const userImage = session.user.image || null;

        // 사용자 세션이 있을 때, 데이터베이스에서 사용자 정보를 업데이트합니다.
        await sql`
          INSERT INTO users (email, name, image, last_login, login_count)
          VALUES (${userEmail}, ${userName}, ${userImage}, CURRENT_TIMESTAMP, 1)
          ON CONFLICT (email) 
          DO UPDATE SET 
            last_login = CURRENT_TIMESTAMP, 
            login_count = users.login_count + 1
        `;

        return session; // 세션 객체를 반환합니다.
      } catch (error) {
        console.error("Error updating session data:", error);
        return session; // 에러가 발생해도 세션을 반환합니다.
      }
    },
  },
});
