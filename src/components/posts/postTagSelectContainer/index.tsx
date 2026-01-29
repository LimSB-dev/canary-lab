"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { TagChip } from "./tagChip";
import { getTags } from "@/app/api/tags";
import { TagManagerModal } from "../TagManagerModal";
import { useAppSelector } from "@/hooks/reduxHook";
import { useTranslation } from "@/hooks/useTranslation";

export const PostTagSelectContainer = () => {
  const { t } = useTranslation();
  const [tags, setTags] = useState<ITag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.user);
  const isAdmin = user.userType === "admin";

  const loadTags = async () => {
    try {
      setIsLoading(true);
      const fetchedTags = await getTags();
      setTags(fetchedTags);
    } catch (error) {
      console.error("Failed to load tags:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <>
      <div id="tag-container" className={styles.post_list_header}>
        <h1>{t("posts.title").toUpperCase()}</h1>
        <div className={styles.tag_section}>
          <ul className={styles.tag_container}>
            {isLoading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <li key={index} className={styles.chip_skeleton} />
                  ))
              : tags.map((tag) => {
                  return <TagChip key={tag.id} tag={tag} type={"header"} />;
                })}
          </ul>
          {isAdmin && (
            <button
              className={styles.manage_button}
              onClick={() => setIsModalOpen(true)}
              aria-label="태그 관리"
            >
              {t("posts.manageTags")}
            </button>
          )}
        </div>
      </div>
      <TagManagerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTagsUpdated={loadTags}
      />
    </>
  );
};

export const SkeletonPostTagSelectContainer = () => {
  const { t } = useTranslation();
  return (
    <div id="tag-container" className={styles.post_list_header}>
      <h1>{t("posts.navPost").toUpperCase()}</h1>
      <ul className={styles.tag_container}>
        {Array(10)
          .fill(0)
          .map((index) => (
            <li key={index} className={styles.chip}>
              {index}
            </li>
          ))}
      </ul>
    </div>
  );
};
