"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { DefaultLogo } from "@/components/common/logo";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setResetPost } from "@/store/modules/post";
import { deletePost, postPost, putPost } from "@/app/api/posts";

const PostsHeader = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isAdmin = user.userType === "admin";
  const isPosts = usePathname().endsWith("/posts");
  const isCreate = usePathname().endsWith("/create");
  const isEdit = usePathname().endsWith("/edit");
  const index = Number(usePathname().split("/")[2]);
  const { title, markdownValue } = useAppSelector((state) => state.post);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <DefaultLogo size="small" />
        {isPosts && isAdmin && <Link href="/posts/create">Create</Link>}
        {!isPosts && <Link href="/posts">Posts</Link>}
      </nav>
      {isAdmin && !isPosts && !isEdit && !isCreate && (
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
      {isAdmin && isEdit && (
        <div className={styles.button_container}>
          <button
            type="button"
            className={`card-shadow ${styles.submit_button}`}
            onClick={async () => {
              await putPost({ index, title, markdownValue });
              dispatch(setResetPost());
            }}
          >
            save
          </button>
          <Link
            href={`/posts/${index}`}
            className={`button-card-shadow ${styles.edit_button}`}
            onClick={() => {
              dispatch(setResetPost());
            }}
          >
            cancel
          </Link>
        </div>
      )}
      {isAdmin && isCreate && (
        <div className={styles.button_container}>
          <button
            type="button"
            className={`card-shadow ${styles.submit_button}`}
            onClick={async () => {
              await postPost({ title, markdownValue });
              dispatch(setResetPost());
            }}
          >
            save
          </button>
          <Link
            href={`/posts`}
            className={`button-card-shadow ${styles.edit_button}`}
            onClick={() => {
              dispatch(setResetPost());
            }}
          >
            cancel
          </Link>
        </div>
      )}
    </header>
  );
};

export default PostsHeader;
