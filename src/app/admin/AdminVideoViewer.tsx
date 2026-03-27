"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./page.module.scss";

interface AdminVideoViewerProps {
  initialVideoUrl: string;
}

export function AdminVideoViewer({ initialVideoUrl }: AdminVideoViewerProps) {
  const [inputUrl, setInputUrl] = useState(initialVideoUrl);
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);

  const sanitizeVideoUrl = (rawUrl: string): string => {
    const trimmed = rawUrl.trim();
    if (!trimmed) {
      return "";
    }
    try {
      const parsed = new URL(trimmed, typeof window !== "undefined" ? window.location.origin : undefined);
      const allowedProtocols = new Set(["http:", "https:", "blob:"]);
      if (!allowedProtocols.has(parsed.protocol)) {
        return "";
      }
      return parsed.toString();
    } catch {
      return "";
    }
  };

  const safeVideoUrl = useMemo(() => sanitizeVideoUrl(videoUrl), [videoUrl]);

  const canRenderVideo = useMemo(() => {
    return safeVideoUrl.length > 0;
  }, [safeVideoUrl]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVideoUrl(inputUrl.trim());
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Admin Video Viewer</h1>
      <p className={styles.description}>
        `ytory.mov` Blob URL을 입력하거나 `NEXT_PUBLIC_YTORY_MOV_URL` 환경변수를 설정해 확인할 수 있습니다.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="url"
          placeholder="https://.../ytory.mov"
          value={inputUrl}
          onChange={(event) => setInputUrl(event.target.value)}
        />
        <button className={styles.button} type="submit">
          영상 불러오기
        </button>
      </form>

      {canRenderVideo ? (
        <div className={styles.videoWrapper}>
          <video className={styles.video} controls preload="metadata" src={safeVideoUrl} />
          <a className={styles.link} href={safeVideoUrl} target="_blank" rel="noreferrer">
            새 탭에서 열기
          </a>
        </div>
      ) : (
        <p className={styles.emptyState}>표시할 영상 URL이 없습니다.</p>
      )}
    </section>
  );
}
