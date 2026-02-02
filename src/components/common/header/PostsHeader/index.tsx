"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./styles.module.scss";

import { DefaultLogo } from "@/components/common/logo";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setResetPost } from "@/store/modules/post";
import { deletePost, postPost, putPost } from "@/app/api/posts";
import { useTranslation } from "@/hooks/useTranslation";

const PostsHeader = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { title, markdownValue } = useAppSelector((state) => state.post);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const isAdmin = user.userType === "admin";
  const isPosts = pathname.endsWith("/posts");
  const isCreate = pathname.endsWith("/create");
  const isEdit = pathname.endsWith("/edit");
  const index = Number(pathname.split("/")[2]);

  const handleButton = async (type: "create" | "edit" | "delete" | "cancel") => {
    try {
      setLoading(true);
      switch (type) {
        case "create":
          await postPost({ title, markdownValue });
          break;
        case "edit":
          await putPost({ index, title, markdownValue });
          break;
        case "delete":
          await deletePost(index);
          break;
        case "delete":
        default:
          break;
      }
      dispatch(setResetPost());
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <DefaultLogo size="small" withText />
        {isPosts && isAdmin && <Link href="/posts/create">{t("posts.create").toUpperCase()}</Link>}
        {!isPosts && <Link href="/posts">{t("posts.navPost").toUpperCase()}</Link>}
      </nav>

      {isAdmin && !isPosts && (
        <div className={styles.button_container}>
          {isEdit || isCreate ? (
            <>
              <button
                type="button"
                className={`card-shadow ${styles.submit_button} ${loading && styles.loading}`}
                onClick={() => (isEdit ? handleButton("edit") : handleButton("create"))}
                disabled={loading}
              >
                {isEdit ? t("common.save") : t("common.create")}
              </button>
              <Link
                href={isEdit ? `/posts/${index}` : "/posts"}
                className={`${styles.cancel_button} ${loading && styles.loading}`}
                onClick={() => handleButton("cancel")}
              >
                {t("common.cancel")}
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/posts/${index}/edit`}
                className={`button-card-shadow ${styles.edit_button} ${loading && styles.loading}`}
              >
                {t("common.edit")}
              </Link>
              <button
                type="button"
                className={`button-card-shadow ${styles.delete_button} ${
                  loading && styles.loading
                }`}
                onClick={() => handleButton("delete")}
                disabled={loading}
              >
                {t("common.delete")}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default PostsHeader;
