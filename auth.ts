import NextAuth from "next-auth";
import Apple from "next-auth/providers/apple";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import Kakao from "next-auth/providers/kakao";
import { authConfig } from "./auth.config";
import { sql } from "@vercel/postgres";
import { ensureAccountsTable } from "./src/utils/ensureAccountsTable";
import { mergeUserIntoUser } from "./src/utils/mergeUserIntoUser";
import { cookies } from "next/headers";

/** 세션 만료: 30일 (Auth.js 기본값, 사용성·보안 균형) */
const SESSION_MAX_AGE = 30 * 24 * 60 * 60;
/** 세션 갱신 주기: 24시간마다 활동 시 만료일 연장 (sliding window) */
const SESSION_UPDATE_AGE = 24 * 60 * 60;

/** 마이페이지에서 '연동 추가' 시 현재 계정에 새 제공자만 연결하기 위한 쿠키 키 */
const ACCOUNT_LINK_EMAIL_COOKIE = "canary_account_link_email";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  session: {
    maxAge: SESSION_MAX_AGE,
    updateAge: SESSION_UPDATE_AGE,
  },
  providers: [GitHub, Apple, Google, Naver, Kakao],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!account?.provider || account.providerAccountId == null) {
          return true;
        }
        await ensureAccountsTable();

        const linkEmail = (await cookies()).get(ACCOUNT_LINK_EMAIL_COOKIE)?.value?.trim();

        if (linkEmail) {
          // 마이페이지 '연동 추가' 모드: 현재 로그인한 계정(linkEmail)에 새 제공자만 연결
          const { rows: userRows } = await sql`
            SELECT id FROM users WHERE email = ${linkEmail}
          `;
          const currentUserId = userRows?.[0]?.id;
          if (!currentUserId) return true;

          const providerId = String(account.providerAccountId);
          const { rows: existingAccount } = await sql`
            SELECT user_id FROM accounts
            WHERE provider = ${account.provider} AND provider_account_id = ${providerId}
          `;
          const previousUserId = existingAccount?.[0]?.user_id;

          const accountImage = user?.image ?? null;
          if (previousUserId && previousUserId !== currentUserId) {
            // 이미 이 제공자 계정이 다른 user에 연결돼 있음 → 기존 user 제거 후 현재 user에 합침
            await sql`
              UPDATE accounts
              SET user_id = ${currentUserId}, image = ${accountImage}
              WHERE provider = ${account.provider} AND provider_account_id = ${providerId}
            `;
            await mergeUserIntoUser(previousUserId, currentUserId);
          } else if (!previousUserId) {
            await sql`
              INSERT INTO accounts (user_id, provider, provider_account_id, image)
              VALUES (${currentUserId}, ${account.provider}, ${providerId}, ${accountImage})
              ON CONFLICT (provider, provider_account_id)
              DO UPDATE SET user_id = EXCLUDED.user_id, image = EXCLUDED.image
            `;
          }
          return true;
        }

        // 일반 로그인: 이미 연동된 계정이면 해당 user로, 아니면 OAuth 이메일 기준 새 user 생성 후 연동
        const providerId = String(account.providerAccountId);
        const { rows: existingAccount } = await sql`
          SELECT user_id FROM accounts
          WHERE provider = ${account.provider} AND provider_account_id = ${providerId}
        `;
        const existingUserId = existingAccount?.[0]?.user_id;

        if (existingUserId) {
          // 이미 연동된 계정 → user의 name/last_login만 갱신 (users.image는 사용자가 직접 변경한 값 유지), account 이미지는 OAuth 기준 갱신
          const userName = user?.name ?? "Unknown";
          const accountImage = user?.image ?? null;
          await sql`
            UPDATE users
            SET name = ${userName}, last_login = CURRENT_TIMESTAMP, login_count = users.login_count + 1
            WHERE id = ${existingUserId}
          `;
          await sql`
            UPDATE accounts SET image = ${accountImage}
            WHERE provider = ${account.provider} AND provider_account_id = ${providerId}
          `;
          return true;
        }

        if (!user?.email) return true;
        const userEmail = user.email;
        const userName = user.name ?? "Unknown";
        const userImage = user.image ?? null;
        const accountImage = user.image ?? null;

        const { rows: userRows } = await sql`
          INSERT INTO users (email, name, image, last_login, login_count)
          VALUES (${userEmail}, ${userName}, ${userImage}, CURRENT_TIMESTAMP, 1)
          ON CONFLICT (email)
          DO UPDATE SET
            name = EXCLUDED.name,
            last_login = CURRENT_TIMESTAMP,
            login_count = users.login_count + 1
          RETURNING id
        `;
        const userId = userRows?.[0]?.id;
        if (!userId) return true;

        await sql`
          INSERT INTO accounts (user_id, provider, provider_account_id, image)
          VALUES (${userId}, ${account.provider}, ${providerId}, ${accountImage})
          ON CONFLICT (provider, provider_account_id)
          DO UPDATE SET user_id = EXCLUDED.user_id, image = EXCLUDED.image
        `;

        return true;
      } catch (error) {
        console.error("Error handling signIn:", error);
        return false;
      }
    },
    async jwt({ token, account }) {
      const linkEmail = (await cookies()).get(ACCOUNT_LINK_EMAIL_COOKIE)?.value?.trim();
      if (account?.provider && linkEmail) {
        // 연동 추가 모드: 세션을 현재 계정(linkEmail)으로 유지
        const { rows } = await sql`
          SELECT id, email, name, image FROM users WHERE email = ${linkEmail}
        `;
        const targetUser = rows?.[0];
        if (targetUser) {
          token.sub = targetUser.id;
          token.email = targetUser.email;
          token.name = targetUser.name;
          token.picture = targetUser.image;
        }
        token.currentProvider = account.provider;
      } else if (account?.provider) {
        // 일반 로그인: 이 계정을 소유한 user로 세션 설정 (연동 후 다른 제공자로 로그인해도 동일 user)
        const providerId = String(account.providerAccountId);
        const { rows: accRows } = await sql`
          SELECT user_id FROM accounts
          WHERE provider = ${account.provider} AND provider_account_id = ${providerId}
        `;
        const ownerUserId = accRows?.[0]?.user_id;
        if (ownerUserId) {
          const { rows: userRows } = await sql`
            SELECT id, email, name, image FROM users WHERE id = ${ownerUserId}
          `;
          const owner = userRows?.[0];
          if (owner) {
            token.sub = owner.id;
            token.email = owner.email;
            token.name = owner.name;
            token.picture = owner.image;
          }
        }
        token.currentProvider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        if (!session?.user?.email) {
          return session;
        }

        const userEmail = session.user.email;
        const userName = session.user.name || "Unknown";
        const userImage = session.user.image || null;

        await sql`
          INSERT INTO users (email, name, image, last_login, login_count)
          VALUES (${userEmail}, ${userName}, ${userImage}, CURRENT_TIMESTAMP, 1)
          ON CONFLICT (email)
          DO UPDATE SET
            last_login = CURRENT_TIMESTAMP,
            login_count = users.login_count + 1
        `;

        const { rows: userRows } = await sql`
          SELECT id, image FROM users WHERE email = ${userEmail}
        `;
        const userId = userRows?.[0]?.id;
        if (userRows?.[0]?.image != null) {
          session.user.image = userRows[0].image;
        }
        if (userId) {
          session.user.id = userId;
          const { rows: accountRows } = await sql`
            SELECT provider FROM accounts WHERE user_id = ${userId}
          `;
          const providers = accountRows?.map((r) => r.provider) ?? [];
          session.user.providers = providers;
        }
        session.user.currentProvider = (token.currentProvider as string) ?? undefined;

        return session;
      } catch (error) {
        console.error("Error updating session data:", error);
        return session;
      }
    },
  },
});
