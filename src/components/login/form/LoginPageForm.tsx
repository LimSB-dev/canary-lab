import Image from "next/image";
import { auth, signIn, signOut } from "../../../../auth";

import styles from "./styles.module.scss";

const LoginPageForm = async () => {
  let session = await auth();
  console.log("🚀 ~ LoginPageForm ~ session:", session);
  let user = session?.user;

  return user ? (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{user.name}</p>

      {user.image && user.name && (
        <Image src={user.image} alt={user.name} width={100} height={100} />
      )}
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
