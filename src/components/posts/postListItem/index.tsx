import Link from "next/link";
import styles from "./styles.module.scss";

interface IProps {
  post: IPost;
}

export const PostListItem = async ({ post }: IProps) => {
  return (
    <li className={`button-card-shadow ${styles.post_list_item}`}>
      <Link href={`/posts/${post.index}`} passHref>
        {post.title}
      </Link>
    </li>
  );
};

export const SkeletonPostListItem = () => {
  return (
    <div className={`button-card-shadow ${styles.post_list_item}`}>
      <li>Loading...</li>
    </div>
  );
};
