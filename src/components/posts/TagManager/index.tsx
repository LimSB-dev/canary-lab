"use client";

import { useState } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { TagChip } from "../postTagSelectContainer/tagChip";
import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";
import { useTags, useTagMutations } from "@/hooks/useTags";

export const TagManager = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: "", color: "#000000" });

  const isAdmin = user.userType === "admin";
  const { data: tags = [], isPending: isLoading } = useTags();
  const { createTag, updateTag, removeTag } = useTagMutations();

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      alert(t("posts.enterTagName"));
      return;
    }
    try {
      await createTag.mutateAsync({
        name: formData.name.trim(),
        color: formData.color,
      });
      setFormData({ name: "", color: "#000000" });
      setIsCreating(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : t("posts.errorCreateTag"));
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.name.trim()) {
      alert(t("posts.enterTagName"));
      return;
    }
    try {
      await updateTag.mutateAsync({
        id,
        name: formData.name.trim(),
        color: formData.color,
      });
      setFormData({ name: "", color: "#000000" });
      setIsEditing(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : t("posts.errorEditTag"));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("posts.confirmDeleteTag"))) return;
    try {
      await removeTag.mutateAsync(id);
    } catch (error) {
      alert(error instanceof Error ? error.message : t("posts.errorDeleteTag"));
    }
  };

  const startEdit = (tag: ITag) => {
    setIsEditing(tag.id);
    setFormData({ name: tag.name, color: tag.color });
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setFormData({ name: "", color: "#000000" });
    setIsEditing(null);
  };

  const cancel = () => {
    setIsCreating(false);
    setIsEditing(null);
    setFormData({ name: "", color: "#000000" });
  };

  if (!isAdmin) {
    return null;
  }

  if (isLoading) {
    return <div className={styles.loading}>{t("posts.loadingTags")}</div>;
  }

  return (
    <div className={styles.tag_manager}>
      <div className={styles.header}>
        <h2>{t("posts.tagManagement")}</h2>
        {!isCreating && (
          <button className={styles.create_button} onClick={startCreate}>
            + {t("posts.addTag")}
          </button>
        )}
      </div>

      {isCreating && (
        <div className={styles.form}>
          <input
            type="text"
            placeholder={t("posts.tagNamePlaceholder")}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={styles.input}
          />
          <input
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className={styles.color_input}
          />
          <div className={styles.form_actions}>
            <button className={styles.save_button} onClick={handleCreate}>
              {t("common.save")}
            </button>
            <button className={styles.cancel_button} onClick={cancel}>
              {t("common.cancel")}
            </button>
          </div>
        </div>
      )}

      <div className={styles.tags_list}>
        {tags.map((tag) => (
          <div key={tag.id} className={styles.tag_item}>
            {isEditing === tag.id ? (
              <div className={styles.form}>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className={styles.color_input}
                />
                <div className={styles.form_actions}>
                  <button className={styles.save_button} onClick={() => handleUpdate(tag.id)}>
                    {t("common.save")}
                  </button>
                  <button className={styles.cancel_button} onClick={cancel}>
                    {t("common.cancel")}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <TagChip tag={tag} type="header" />
                <div className={styles.actions}>
                  <button className={styles.edit_button} onClick={() => startEdit(tag)}>
                    {t("common.edit")}
                  </button>
                  <button className={styles.delete_button} onClick={() => handleDelete(tag.id)}>
                    {t("common.delete")}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
