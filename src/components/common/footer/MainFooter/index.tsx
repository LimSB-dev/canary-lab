import { ThemeButton } from "@/components/common/theme";
import styles from "./styles.module.scss";

const MainFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>Copyright © {year} All rights reserved</p>
      <section className={styles.theme_section}>
        <ThemeButton buttonType="system" />
        <ThemeButton buttonType="light" />
        <ThemeButton buttonType="dark" />
      </section>
    </footer>
  );
};

export default MainFooter;
