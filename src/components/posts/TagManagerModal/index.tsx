"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { getTags, postTag, putTag, deleteTag } from "@/app/api/tags";
import styles from "./styles.module.scss";

interface TagManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTagsUpdated?: () => void;
}

export const TagManagerModal = ({
  isOpen,
  onClose,
  onTagsUpdated,
}: TagManagerModalProps) => {
  const user = useAppSelector((state) => state.user);
  const [tags, setTags] = useState<ITag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: "", color: "#000000" });

  const isAdmin = user.userType === "admin";

  useEffect(() => {
    if (isOpen && isAdmin) {
      loadTags();
    }
  }, [isOpen, isAdmin]);

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
      alert("태그 이름을 입력해주세요.");
      return;
    }

    try {
      await postTag({ name: formData.name.trim(), color: formData.color });
      await loadTags();
      setFormData({ name: "", color: "#000000" });
      setIsCreating(false);
      onTagsUpdated?.();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "태그 생성 중 오류가 발생했습니다."
      );
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.name.trim()) {
      alert("태그 이름을 입력해주세요.");
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
      onTagsUpdated?.();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "태그 수정 중 오류가 발생했습니다."
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 이 태그를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteTag(id);
      await loadTags();
      onTagsUpdated?.();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "태그 삭제 중 오류가 발생했습니다."
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

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>태그 관리</h2>
          <button className={styles.close_button} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          {!isAdmin ? (
            <div className={styles.no_access}>
              관리자만 태그를 관리할 수 있습니다.
            </div>
          ) : isLoading ? (
            <div className={styles.loading}>태그를 불러오는 중...</div>
          ) : (
            <>
              {!isCreating && (
                <button className={styles.create_button} onClick={startCreate}>
                  + 태그 추가
                </button>
              )}

              {isCreating && (
                <div className={styles.form}>
                  <input
                    type="text"
                    placeholder="태그 이름"
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
                      onClick={handleCreate}
                    >
                      생성
                    </button>
                    <button className={styles.cancel_button} onClick={cancel}>
                      취소
                    </button>
                  </div>
                </div>
              )}

              <div className={styles.tags_list}>
                {tags.length === 0 ? (
                  <div className={styles.empty}>태그가 없습니다.</div>
                ) : (
                  tags.map((tag) => (
                    <div key={tag.id} className={styles.tag_item}>
                      {isEditing === tag.id ? (
                        <>
                          <span
                            className={styles.tag_preview}
                            style={{ color: formData.color }}
                          >
                            {formData.name?.trim() ? formData.name : tag.name}
                          </span>
                          <div className={`${styles.form} ${styles.form_inline}`}>
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
                              저장
                            </button>
                            <button
                              className={styles.cancel_button}
                              onClick={cancel}
                            >
                              취소
                            </button>
                          </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <span
                            className={styles.tag_preview}
                            style={{ color: tag.color }}
                          >
                            {tag.name}
                          </span>
                          <div className={styles.actions}>
                            <button
                              className={styles.edit_button}
                              onClick={() => startEdit(tag)}
                            >
                              수정
                            </button>
                            <button
                              className={styles.delete_button}
                              onClick={() => handleDelete(tag.id)}
                            >
                              삭제
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
