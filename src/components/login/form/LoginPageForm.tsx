import { auth, signIn, signOut } from "../../../../auth";
import OauthLoginButton from "@/components/login/oauthLoginButton/OauthLoginButton";
import UserProfile from "@/components/login/form/userProfile";

import styles from "./styles.module.scss";

const LoginPageForm = async () => {
  let session = await auth();
  let user = session?.user;

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault(); // 폼의 기본 동작(페이지 새로고침)을 방지합니다.
    await signIn("github");
  };

  return user ? (
    <div className={styles.user_profile_container}>
      <UserProfile user={user} />
    </div>
  ) : (
    <form className={styles.form} onSubmit={handleSignIn}>
      <button className={styles.button} type="submit">
        <OauthLoginButton provider="github" theme="light" type="default" />
      </button>
    </form>
  );
};

export default LoginPageForm;
