import Link from "next/link";
import styles from "./styles.module.scss";
import { DefaultLogo } from "@/components/common/logo";

const PostsHeader = () => {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <DefaultLogo size="small" />
        <Link href="/create">Create</Link>
      </section>
    </header>
  );
};

export default PostsHeader;
