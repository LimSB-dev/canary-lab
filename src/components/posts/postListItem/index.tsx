"use client";

import Link from "next/link";
import Image from "next/image";
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

const isVercelBlobUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "blob.vercel-storage.com";
  } catch {
    return false;
  }
};

export const PostListItem = ({ post, tags }: IProps) => {
  const user = useAppSelector((state) => state.user);
  const tag = useAppSelector((state) => state.tag);
  const formattedDate = new Date(post.createdAt as any).toLocaleDateString(
    "ko-KR",
    {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
    }
  );

  const postTags = tags.filter((tag) => post.tags?.includes(tag.id));

  if (
    !isEmpty(tag.selectedTagIds) &&
    isEmpty(intersection(post.tags, tag.selectedTagIds))
  ) {
    return <></>;
  }

  return (
    <li className={styles.post_list_item}>
      <Link
        href={`/posts/${post.index}`}
        className={styles.post_list_link}
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
              unoptimized={isVercelBlobUrl(post.thumbnailUrl)}
            />
          </div>
        )}
        <div className={styles.item_body}>
          <h3 className={styles.item_title}>{post.title}</h3>
          <ul className={styles.tag_list}>
            {postTags.map((t) => (
              <TagChip key={t.id} tag={t} type="card" />
            ))}
          </ul>
          <div className={styles.item_footer}>
            <span className={styles.item_date}>{formattedDate}</span>
            <div className={styles.item_icons}>
              <span>
                <FontAwesomeIcon
                  icon={
                    Array.isArray(post.likes) && user.id && post.likes.includes(user.id)
                      ? solidHeart
                      : regularHeart
                  }
                />
                {Array.isArray(post.likes) ? post.likes.length : 0}
              </span>
              <span>
                <FontAwesomeIcon icon={faEye} />
                {post.views}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export const SkeletonPostListItem = () => (
  <li className={styles.post_list_item}>
    <div className={styles.post_list_link}>
      <div className={styles.thumbnail_wrap} aria-hidden />
      <div className={styles.item_body}>
        <div className={styles.skeleton_title} />
        <div className={styles.skeleton_meta} />
      </div>
    </div>
  </li>
);
