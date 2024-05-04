import Link from "next/link";
import styles from "./styles.module.scss";

interface IProps {
  post: IPost;
}

export const PostListItem = async ({ post }: IProps) => {
  return (
    <Link
      href={`/posts/${post.index}`}
      className={styles.post_list_item}
      passHref
    >
      <li>{post.title}</li>
    </Link>
  );
};
