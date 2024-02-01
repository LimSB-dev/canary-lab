import { DefaultLogo } from "@/components/common/logo";
import styles from "./page.module.scss";

export default function Post() {
  return (
    <main id="main-page" role="main" className={styles.main}>
      <DefaultLogo />
      <h1>posts</h1>
    </main>
  );
}
