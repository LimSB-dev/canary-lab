import Link from "next/link";
import styles from "./styles.module.scss";
import { DefaultLogo } from "@/components/common/logo";

const CreateHeader = () => {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <DefaultLogo size="small" />
        <Link href="/posts">Posts</Link>
      </section>
    </header>
  );
};

export default CreateHeader;
