"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { getTags, postTag, putTag, deleteTag } from "@/app/api/tags";
import { TagChip } from "../postTagSelectContainer/tagChip";
import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

export const TagManager = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const [tags, setTags] = useState<ITag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: "", color: "#000000" });

  const isAdmin = user.userType === "admin";

  useEffect(() => {
    loadTags();
  }, []);

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

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      alert(t("posts.enterTagName"));
      return;
    }

    try {
      await postTag({ name: formData.name.trim(), color: formData.color });
      await loadTags();
      setFormData({ name: "", color: "#000000" });
      setIsCreating(false);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : t("posts.errorCreateTag")
      );
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.name.trim()) {
      alert(t("posts.enterTagName"));
      return;
    }

    try {
      await putTag({
        id,
        name: formData.name.trim(),
        color: formData.color,
      });
      await loadTags();
      setFormData({ name: "", color: "#000000" });
      setIsEditing(null);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : t("posts.errorEditTag")
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("posts.confirmDeleteTag"))) {
      return;
    }

    try {
      await deleteTag(id);
      await loadTags();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : t("posts.errorDeleteTag")
      );
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
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
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
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={styles.input}
                />
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
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
            ) : (
              <>
                <TagChip tag={tag} type="header" />
                <div className={styles.actions}>
                  <button
                    className={styles.edit_button}
                    onClick={() => startEdit(tag)}
                  >
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
        ))}
      </div>
    </div>
  );
};
