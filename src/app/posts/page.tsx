import Logo from "@/components/common/atoms/Logo";
import styles from "./page.module.scss";

export default function Post() {
  return (
    <main id="main-page" role="main" className={styles.main}>
      <Logo />
      <h1>posts</h1>
    </main>
  );
}
