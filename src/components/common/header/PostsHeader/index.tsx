"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { DefaultLogo } from "@/components/common/logo";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/hooks/reduxHook";
import { deletePost } from "@/lib/fetch/posts";

const PostsHeader = () => {
  const isPosts = usePathname().endsWith("posts");
  const id = usePathname().split("/")[2];

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <DefaultLogo size="small" />
        {isPosts && <Link href="/create">Create</Link>}
        {!isPosts && <Link href="/posts">Posts</Link>}
      </nav>
      {!isPosts && (
        <div className={styles.button_container}>
          <Link
            href={`/posts/${id}/edit`}
            className={`button-card-shadow ${styles.edit_button}`}
          >
            edit
          </Link>
          <button
            type="button"
            className={`button-card-shadow ${styles.delete_button}`}
            onClick={() => deletePost(id)}
          >
            delete
          </button>
        </div>
      )}
    </header>
  );
};

export default PostsHeader;
