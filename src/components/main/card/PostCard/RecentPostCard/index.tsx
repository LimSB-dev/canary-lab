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

interface IProps {
  post: IPost;
}

const RecentPostCard = ({ post }: IProps) => {
  const user = useAppSelector((state) => state.user);
  const formattedDate = post.createdAt.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  });
  return (
    <Link
      className={`button-card-shadow ${styles.card_resent}`}
      href={`/posts/${post.index}`}
      passHref
    >
      <h6>{post.title}</h6>
      <div className={styles.item_footer}>
        {/* TODO: <p>tag</p> */}
        <caption>{formattedDate}</caption>
        <div className={styles.icon_container}>
          <FontAwesomeIcon
            icon={post.likes.includes(user.id) ? solidHeart : regularHeart}
          />
          {post.likes.length}
          <FontAwesomeIcon icon={faEye} />
          {post.views}
        </div>
      </div>
    </Link>
  );
};

export default RecentPostCard;
