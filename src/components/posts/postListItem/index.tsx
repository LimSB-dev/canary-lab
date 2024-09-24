"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faEye,
  faHeart as regularHeart,
} from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "@/hooks/reduxHook";

interface IProps {
  post: IPost;
}

export const PostListItem = ({ post }: IProps) => {
  const user = useAppSelector((state) => state.user);
  const formattedDate = post.createdAt.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  });

  return (
    <li className={`button-card-shadow ${styles.post_list_item}`}>
      <Link
        href={`/posts/${post.index}`}
        className={styles.post_list_link}
        passHref
      >
        <div className={styles.item_header}>
          <p>{post.title}</p>
        </div>
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
    </li>
  );
};

export const SkeletonPostListItem = () => {
  return (
    <li className={`button-card-shadow ${styles.post_list_item}`}>
      <p className={styles.post_list_link}>Loading...</p>
    </li>
  );
};
