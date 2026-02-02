"use client";

import { useState } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";
import { useTags, useTagMutations } from "@/hooks/useTags";

interface TagManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTagsUpdated?: () => void;
}

export const TagManagerModal = ({ isOpen, onClose, onTagsUpdated }: TagManagerModalProps) => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: "", color: "#000000" });

  const isAdmin = user.userType === "admin";
  const { data: tags = [], isPending: isLoading } = useTags({
    enabled: isOpen && isAdmin,
  });
  const { createTag, updateTag, removeTag } = useTagMutations();

  const onSuccess = () => {
    onTagsUpdated?.();
  };

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
      onSuccess();
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
      onSuccess();
    } catch (error) {
      alert(error instanceof Error ? error.message : t("posts.errorEditTag"));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("posts.confirmDeleteTag"))) return;
    try {
      await removeTag.mutateAsync(id);
      onSuccess();
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

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{t("posts.tagManagement")}</h2>
          <button className={styles.close_button} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          {!isAdmin ? (
            <div className={styles.no_access}>{t("posts.adminOnlyTagManage")}</div>
          ) : isLoading ? (
            <div className={styles.loading}>{t("posts.loadingTags")}</div>
          ) : (
            <>
              {!isCreating && (
                <button className={styles.create_button} onClick={startCreate}>
                  + {t("posts.addTag")}
                </button>
              )}

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
                {tags.length === 0 ? (
                  <div className={styles.empty}>{t("posts.noTags")}</div>
                ) : (
                  tags.map((tag) => (
                    <div key={tag.id} className={styles.tag_item}>
                      {isEditing === tag.id ? (
                        <>
                          <span className={styles.tag_preview} style={{ color: formData.color }}>
                            {formData.name?.trim() ? formData.name : tag.name}
                          </span>
                          <div className={`${styles.form} ${styles.form_inline}`}>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className={styles.input}
                            />
                            <input
                              type="color"
                              value={formData.color}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  color: e.target.value,
                                })
                              }
                              className={styles.color_input}
                            />
                            <div className={styles.form_actions}>
                              <button
                                className={styles.save_button}
                                onClick={() => handleUpdate(tag.id)}
                              >
                                {t("common.save")}
                              </button>
                              <button className={styles.cancel_button} onClick={cancel}>
                                {t("common.cancel")}
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className={styles.tag_preview} style={{ color: tag.color }}>
                            {tag.name}
                          </span>
                          <div className={styles.actions}>
                            <button className={styles.edit_button} onClick={() => startEdit(tag)}>
                              {t("common.edit")}
                            </button>
                            <button
                              className={styles.delete_button}
                              onClick={() => handleDelete(tag.id)}
                            >
                              {t("common.delete")}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
