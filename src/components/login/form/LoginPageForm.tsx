import { auth, signIn, signOut } from "../../../../auth";

import styles from "./styles.module.scss";
import UserProfile from "./userProfile";

const LoginPageForm = async () => {
  let session = await auth();
  let user = session?.user;

  return user ? (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <UserProfile user={user} />
      <button className={styles.login_button} type="submit">
        Sign Out
      </button>
    </form>
  ) : (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button className={styles.login_button} type="submit">
        Github
      </button>
    </form>
  );
};

export default LoginPageForm;
