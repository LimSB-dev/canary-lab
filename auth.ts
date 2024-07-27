import NextAuth from "next-auth";
import Apple from "next-auth/providers/apple";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import Kakao from "next-auth/providers/kakao";
import { authConfig } from "./auth.config";
import { sql } from "@vercel/postgres";

async function getUser(email: string): Promise<IUser | undefined> {
  try {
    const user = await sql<IUser>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [GitHub, Apple, Google, Naver, Kakao],
});
