"use client";

import Link from "next/link";

import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

interface PostNavigationProps {
  previousPost?: IPost;
  nextPost?: IPost;
}

const PostNavigation: React.FC<PostNavigationProps> = ({ previousPost, nextPost }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.post_navigation}>
      {previousPost ? (
        <Link href={`/posts/${previousPost.index}`} className={`${styles.nav_link} prev`}>
          {previousPost.title}
        </Link>
      ) : (
        <span className={styles.disabled_nav_link}>{t("posts.noPrevPost")}</span>
      )}
      {nextPost ? (
        <Link href={`/posts/${nextPost.index}`} className={`${styles.nav_link} next`}>
          {nextPost.title}
        </Link>
      ) : (
        <span className={styles.disabled_nav_link}>{t("posts.noNextPost")}</span>
      )}
    </div>
  );
};

export default PostNavigation;
