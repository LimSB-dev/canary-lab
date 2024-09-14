"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { DefaultLogo } from "@/components/common/logo";
import { usePathname } from "next/navigation";
import { deletePost } from "@/lib/fetch/posts";
import { useAppSelector } from "@/hooks/reduxHook";

const PostsHeader = () => {
  const user = useAppSelector((state) => state.user);
  const isAdmin = user.userType === "admin";
  const isPosts = usePathname().endsWith("/posts");
  const isEdit = usePathname().endsWith("/edit");
  const index = usePathname().split("/")[2];

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <DefaultLogo size="small" />
        {isPosts && isAdmin && <Link href="/posts/create">Create</Link>}
        {!isPosts && <Link href="/posts">Posts</Link>}
      </nav>
      {!isPosts && !isEdit && isAdmin && (
        <div className={styles.button_container}>
          <Link
            href={`/posts/${index}/edit`}
            className={`button-card-shadow ${styles.edit_button}`}
          >
            edit
          </Link>
          <button
            type="button"
            className={`button-card-shadow ${styles.delete_button}`}
            onClick={() => deletePost(index)}
          >
            delete
          </button>
        </div>
      )}
      {isEdit && isAdmin && (
        <Link
          href={`/posts/${index}`}
          className={`button-card-shadow ${styles.edit_button}`}
        >
          cancel
        </Link>
      )}
    </header>
  );
};

export default PostsHeader;
