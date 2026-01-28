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
import { intersection, isEmpty } from "lodash";
import { TagChip } from "@/components/posts/postTagSelectContainer/tagChip";

interface IProps {
  post: IPost;
  tags: ITag[];
}

export const PostListItem = ({ post, tags }: IProps) => {
  const user = useAppSelector((state) => state.user);
  const tag = useAppSelector((state) => state.tag);
  const formattedDate = post.createdAt.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  });

  const postTags = tags.filter((tag) => post.tags?.includes(tag.id));

  if (
    !isEmpty(tag.selectedTagIds) &&
    isEmpty(intersection(post.tags, tag.selectedTagIds))
  ) {
    return <></>;
  }

  return (
    <li className={`button-card-shadow ${styles.post_list_item}`}>
      <Link
        href={`/posts/${post.index}`}
        className={styles.post_list_link}
        passHref
      >
        <div className={styles.item_header}>
          <p>{post.title}</p>
          <div className={styles.icon_container}>
            <FontAwesomeIcon
              icon={post.likes.includes(user.id) ? solidHeart : regularHeart}
            />
            {post.likes.length}
            <FontAwesomeIcon icon={faEye} />
            {post.views}
          </div>
        </div>
        <div className={styles.item_footer}>
          <ul>
            {postTags.map((tag) => {
              return <TagChip key={tag.id} tag={tag} type={"card"} />;
            })}
          </ul>
          <caption>{formattedDate}</caption>
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
