import Link from "next/link";

import styles from "./styles.module.scss";

interface PostNavigationProps {
  previousPost?: IPost;
  nextPost?: IPost;
}

const PostNavigation: React.FC<PostNavigationProps> = ({
  previousPost,
  nextPost,
}) => {
  return (
    <div className={styles.post_navigation}>
      {previousPost ? (
        <Link
          href={`/posts/${previousPost.index}`}
          className={`${styles.nav_link} prev`}
        >
          {previousPost.title}
        </Link>
      ) : (
        <span className={styles.disabled_nav_link}>이전 게시글 없음</span>
      )}
      {nextPost ? (
        <Link
          href={`/posts/${nextPost.index}`}
          className={`${styles.nav_link} next`}
        >
          {nextPost.title}
        </Link>
      ) : (
        <span className={styles.disabled_nav_link}>다음 게시글 없음</span>
      )}
    </div>
  );
};

export default PostNavigation;
