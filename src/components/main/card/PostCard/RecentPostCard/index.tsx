import Link from "next/link";
import styles from "./styles.module.scss";

interface IProps {
  post: IPost;
}

const RecentPostCard = ({ post }: IProps) => {
  return (
    <Link
      className={`button-card-shadow ${styles.card_resent}`}
      href={`/posts/${post.id}`}
      passHref
    >
      <h6>{post.title}</h6>
    </Link>
  );
};

export default RecentPostCard;
