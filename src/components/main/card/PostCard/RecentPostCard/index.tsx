"use client";

import Link from "next/link";
import Image from "next/image";
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
  const date = new Date(post.createdAt);
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return (
    <Link
      className={`button-card-shadow ${styles.card_resent}`}
      href={`/posts/${post.index}`}
      passHref
    >
      {post.thumbnailUrl && (
        <div className={styles.thumbnail_wrap}>
          <Image
            src={post.thumbnailUrl}
            alt=""
            width={320}
            height={180}
            className={styles.thumbnail}
            unoptimized={post.thumbnailUrl.includes("blob.vercel-storage.com")}
          />
        </div>
      )}
      <div className={styles.card_body}>
        <h6>{post.title}</h6>
        <div className={styles.item_footer}>
          <caption>{formattedDate}</caption>
          <div className={styles.icon_container}>
            <div>
              <FontAwesomeIcon
                icon={post.likes.includes(user.id) ? solidHeart : regularHeart}
              />
              {post.likes.length}
            </div>
            <div>
              <FontAwesomeIcon icon={faEye} />
              {post.views}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default RecentPostCard;
