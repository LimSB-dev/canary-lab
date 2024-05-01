import { Metadata } from "next";
import styles from "./page.module.scss";
import LoginPageForm from "@/components/login/form/LoginPageForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <LoginPageForm />
    </main>
  );
}
