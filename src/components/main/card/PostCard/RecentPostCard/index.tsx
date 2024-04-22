import styles from "./styles.module.scss";

interface IProps {
  post: IPost;
}

const RecentPostCard = ({ post }: IProps) => {
  return (
    <article className={`button-card-shadow ${styles.card_resent}`}>
      <h6>{post.title}</h6>
    </article>
  );
};

export default RecentPostCard;
