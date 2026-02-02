"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserImage } from "./actions";
import { useTranslation } from "@/hooks/useTranslation";

interface AvatarChangeProps {
  currentUserEmail: string;
  currentImage: string | null;
  styles: Record<string, string>;
}

export function AvatarChange({ currentUserEmail, currentImage, styles: s }: AvatarChangeProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file || !currentUserEmail) return;
    if (!file.type.startsWith("image/")) {
      setError(t("mypage.avatar.invalidType"));
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/image/upload",
      });
      await updateUserImage(currentUserEmail, blob.url);
      router.refresh();
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : t("mypage.avatar.uploadError"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={s.avatar_change}>
      <div className={s.avatar_wrapper}>
        {currentImage ? (
          <img
            src={currentImage}
            alt={t("mypage.avatar.alt")}
            width={96}
            height={96}
            className={s.avatar}
          />
        ) : (
          <div className={s.avatar_placeholder} aria-hidden />
        )}
      </div>
      <form onSubmit={handleSubmit} className={s.avatar_form}>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          aria-label={t("mypage.avatar.chooseFile")}
          className={s.avatar_input}
          onChange={() => setError(null)}
        />
        <button type="submit" className={s.avatar_button} disabled={uploading}>
          {uploading ? t("common.loading") : t("mypage.avatar.change")}
        </button>
      </form>
      {error && (
        <p className={s.avatar_error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
