import Link from "next/link";
import styles from "./styles.module.scss";
import { DefaultLogo } from "@/components/common/logo";

const PostsHeader = () => {
  return (
    <header className={styles.header}>
      <DefaultLogo />
      <Link href="/create">Create</Link>
    </header>
  );
};

export default PostsHeader;
