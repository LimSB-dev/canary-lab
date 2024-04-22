"use client";

import { title } from "process";
import styles from "./styles.module.scss";

interface IProps {
  popularPosts: IPost[];
}

const PopularPostCard = ({ popularPosts }: IProps) => {
  const post = popularPosts ? popularPosts[0] : { title: "No Post" };
  console.log("🚀 ~ PopularPostCard ~ post:", post);

  return (
    <article className={`button-card-shadow ${styles.card_popular}`}>
      <h6>{post.title}</h6>
    </article>
  );
};

export default PopularPostCard;
