import { auth, signIn, signOut } from "@/auth";
import OauthLoginButton from "@/components/login/oauthLoginButton/OauthLoginButton";

import styles from "./styles.module.scss";
import UserProfile from "./userProfile";

const LoginPageForm = async () => {
  let session = await auth();
  let user = session?.user;

  return user && session ? (
    <div className={styles.user_profile_container}>
      <UserProfile user={user} session={session} />
    </div>
  ) : (
    <div className={styles.form}>
      <form
        className={styles.button_wrapper}
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
      <form
        className={styles.button_wrapper}
        action={
          (async () => {
            "use server";
            await signIn("google");
          }) as any
        }
      >
        <button className={styles.button} type="submit">
          <OauthLoginButton provider="google" theme="light" type="default" />
        </button>
      </form>
    </div>
  );
};

export default LoginPageForm;
