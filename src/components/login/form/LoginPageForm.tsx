import { auth, signIn, signOut } from "@/auth";
import OauthLoginButton from "@/components/login/oauthLoginButton/OauthLoginButton";

import styles from "./styles.module.scss";
import UserProfile from "./userProfile";

const LoginPageForm = async () => {
  let session = await auth();
  let user = session?.user;

  return user ? (
    <div className={styles.user_profile_container}>
      <UserProfile user={user} />
    </div>
  ) : (
    <form
      className={styles.form}
      // React 타입(구버전) 환경에서 server action 타입에러 회피
      action={
        (async () => {
          "use server";
          await signIn("github");
        }) as any
      }
    >
      <button className={styles.button} type="submit">
        <OauthLoginButton provider="github" theme="light" type="default" />
      </button>
    </form>
  );
};

export default LoginPageForm;
