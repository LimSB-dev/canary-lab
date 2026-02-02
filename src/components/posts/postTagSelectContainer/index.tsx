"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { TagChip } from "./tagChip";
import { TagManagerModal } from "../TagManagerModal";
import { useAppSelector } from "@/hooks/reduxHook";
import { useTranslation } from "@/hooks/useTranslation";
import { useTags } from "@/hooks/useTags";

export const PostTagSelectContainer = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.user);
  const isAdmin = user.userType === "admin";

  const { data: tags = [], isPending: isLoading, refetch: refetchTags } = useTags();

  return (
    <>
      <div id="tag-container" className={styles.post_list_header}>
        <h1>{t("posts.title").toUpperCase()}</h1>
        <div className={styles.tag_section}>
          <ul className={styles.tag_container}>
            {isLoading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => <li key={i} className={styles.chip_skeleton} />)
              : tags.map((tag) => <TagChip key={tag.id} tag={tag} type={"header"} />)}
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
        onTagsUpdated={refetchTags}
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
          .fill(null)
          .map((_, i) => (
            <li key={i} className={styles.chip} />
          ))}
      </ul>
    </div>
  );
};
