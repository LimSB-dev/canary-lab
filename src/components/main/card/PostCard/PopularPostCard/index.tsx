"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart as regularHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/hooks/reduxHook";
import { isEmpty } from "lodash";

interface IProps {
  popularPosts: IPost[];
}

const formatDate = (date: Date) =>
  date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  });

const PopularPostCard = ({ popularPosts }: IProps) => {
  const user = useAppSelector((state) => state.user);

  if (isEmpty(popularPosts)) {
    return (
      <Link
        className={`button-card-shadow ${styles.card_popular}`}
        href={"/create"}
        passHref
      >
        <h6>게시물이 없습니다.</h6>
      </Link>
    );
  }

  const post = popularPosts[0];
  const formattedDate = formatDate(post.createdAt);
  const isLikedByUser = post.likes.includes(user.id);

  return (
    <Link
      className={`button-card-shadow ${styles.card_popular}`}
      href={post.index ? `/posts/${post.index}` : "/create"}
      passHref
    >
      <h6>{post.title}</h6>
      <div className={styles.item_footer}>
        <caption>{formattedDate}</caption>
        <div className={styles.icon_container}>
          <FontAwesomeIcon icon={isLikedByUser ? solidHeart : regularHeart} />
          {post.likes.length}
          <FontAwesomeIcon icon={faEye} />
          {post.views}
        </div>
      </div>
    </Link>
  );
};

export default PopularPostCard;
