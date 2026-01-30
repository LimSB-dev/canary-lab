"use client";

import { useState } from "react";
import { useAppDispatch } from "@/hooks/reduxHook";
import { useTranslation } from "@/hooks/useTranslation";
import { setMarkdownValue } from "@/store/modules/post";
import { generateMarkdownFromPrompt } from "@/app/api/posts/generateMarkdown";
import styles from "./styles.module.scss";

const PROMPT_MAX_LENGTH = 2000;
export default function GenerateMarkdownFromPrompt() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
      const markdown = await generateMarkdownFromPrompt(prompt.trim());
      dispatch(setMarkdownValue(markdown));
      setIsOpen(false);
      alert(t("posts.generateMarkdownSuccess"));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("posts.generateMarkdownError")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {t("posts.generateMarkdownFromPrompt")}
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
            aria-labelledby="markdown-prompt-modal-title"
            aria-describedby="markdown-prompt-modal-desc"
          >
            <h2 id="markdown-prompt-modal-title" className={styles.title}>
              {t("posts.generateMarkdownModalTitle")}
            </h2>
            <p id="markdown-prompt-modal-desc" className={styles.desc}>
              {t("posts.generateMarkdownPromptHint")}
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label htmlFor="markdown-prompt" className={styles.label}>
                {t("posts.generateMarkdownPromptLabel")}
              </label>
              <textarea
                id="markdown-prompt"
                className={styles.textarea}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t("posts.generateMarkdownPromptPlaceholder")}
                rows={5}
                disabled={loading}
                maxLength={PROMPT_MAX_LENGTH}
                required
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
                  disabled={loading || !prompt.trim()}
                >
                  {loading
                    ? t("posts.generateMarkdownLoading")
                    : t("posts.generateMarkdownSubmit")}
                </button>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
}
