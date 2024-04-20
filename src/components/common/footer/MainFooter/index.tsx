import { ThemeButton } from "@/components/common/theme";
import styles from "./styles.module.scss";

const MainFooter = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright © 2024 All rights reserved</p>
      <section className={styles.theme_section}>
        <ThemeButton buttonType="system" />
        <ThemeButton buttonType="light" />
        <ThemeButton buttonType="dark" />
      </section>
    </footer>
  );
};

export default MainFooter;
