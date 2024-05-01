"use client";

import styles from "./styles.module.scss";
import Link from "next/link";

interface IProps {
  popularPosts: IPost[];
}

const PopularPostCard = ({ popularPosts }: IProps) => {
  const post = popularPosts ? popularPosts[0] : { id: null, title: "No Post" };

  return (
    <Link
      className={`button-card-shadow ${styles.card_popular}`}
      href={post.id ? `/posts/${post.id}` : "/create"}
      passHref
    >
      <h6>{post.title}</h6>
    </Link>
  );
};

export default PopularPostCard;
