import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      /** 연동된 OAuth 제공자 목록 (예: github, google) */
      providers?: string[];
      /** 현재 로그인에 사용한 제공자 */
      currentProvider?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    currentProvider?: string;
  }
}
