"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/reduxHook";
import { useTranslation } from "@/hooks/useTranslation";
import { queryKeys } from "@/constants";
import { generatePostThumbnail } from "@/app/api/posts/generateThumbnail";
import styles from "./styles.module.scss";

interface IProps {
  postIndex: number;
}

export default function ThumbnailGenerateButton({ postIndex }: IProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);
  const isAdmin = user.userType === "admin";

  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => {
    setPrompt("");
    setError(null);
    setIsOpen(true);
  };

  const handleClose = () => {
    if (!loading) setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await generatePostThumbnail(postIndex, prompt.trim() || undefined);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.posts.detail(postIndex),
      });
      await queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
      router.refresh();
      setIsOpen(false);
      alert(t("posts.generateThumbnailSuccess"));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("posts.generateThumbnailError")
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {t("posts.generateThumbnail")}
      </button>

      {isOpen && (
        <div
          className={styles.overlay}
          onClick={handleClose}
          onKeyDown={(e) => e.key === "Escape" && handleClose()}
          role="presentation"
        >
          <dialog
            open
            className={styles.dialog}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === "Escape" && handleClose()}
            aria-labelledby="thumbnail-modal-title"
            aria-describedby="thumbnail-modal-desc"
          >
            <h2 id="thumbnail-modal-title" className={styles.title}>
              {t("posts.generateThumbnailModalTitle")}
            </h2>
            <p id="thumbnail-modal-desc" className={styles.desc}>
              {t("posts.generateThumbnailPromptHint")}
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label htmlFor="thumbnail-prompt" className={styles.label}>
                {t("posts.generateThumbnailPromptLabel")}
              </label>
              <textarea
                id="thumbnail-prompt"
                className={styles.textarea}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t("posts.generateThumbnailPromptPlaceholder")}
                rows={4}
                disabled={loading}
                maxLength={800}
                autoFocus
              />
              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.cancel}
                  onClick={handleClose}
                  disabled={loading}
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  className={styles.submit}
                  disabled={loading}
                >
                  {loading
                    ? t("posts.generateThumbnailLoading")
                    : t("posts.generateThumbnailSubmit")}
                </button>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
}
