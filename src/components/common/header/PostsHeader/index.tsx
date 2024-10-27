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
  const { title, markdownValue } = useAppSelector((state) => state.post);

  const pathname = usePathname();
  const isAdmin = user.userType === "admin";
  const isPosts = pathname.endsWith("/posts");
  const isCreate = pathname.endsWith("/create");
  const isEdit = pathname.endsWith("/edit");
  const index = Number(pathname.split("/")[2]);

  const handleSave = async () => {
    if (isEdit) await putPost({ index, title, markdownValue });
    if (isCreate) await postPost({ title, markdownValue });
    dispatch(setResetPost());
  };

  const handleDelete = async () => {
    await deletePost(index);
    dispatch(setResetPost());
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <DefaultLogo size="small" withText />
        {isPosts && isAdmin && <Link href="/posts/create">CREATE</Link>}
        {!isPosts && <Link href="/posts">POST</Link>}
      </nav>

      {isAdmin && (
        <div className={styles.button_container}>
          {isPosts ? null : (
            <>
              {!isEdit && !isCreate && (
                <>
                  <Link
                    href={`/posts/${index}/edit`}
                    className={`button-card-shadow ${styles.edit_button}`}
                  >
                    edit
                  </Link>
                  <button
                    type="button"
                    className={`button-card-shadow ${styles.delete_button}`}
                    onClick={handleDelete}
                  >
                    delete
                  </button>
                </>
              )}
              {(isEdit || isCreate) && (
                <>
                  <button
                    type="button"
                    className={`card-shadow ${styles.submit_button}`}
                    onClick={handleSave}
                  >
                    save
                  </button>
                  <Link
                    href={isEdit ? `/posts/${index}` : "/posts"}
                    className={`button-card-shadow ${styles.edit_button}`}
                    onClick={() => dispatch(setResetPost())}
                  >
                    cancel
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default PostsHeader;
