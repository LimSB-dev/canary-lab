import Image from "next/image";
import type { ProjectPreview } from "@/app/api/projects/getPreview";
import styles from "./styles.module.scss";

interface ProjectCardProps {
  preview: ProjectPreview;
}

export const ProjectCard = ({ preview }: ProjectCardProps) => {
  const { url, title, description, image } = preview;
  const displayTitle = title ?? "제목 없음";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={displayTitle}
    >
      <header className={styles.terminal_header}>
        <ul className={styles.terminal_controls} aria-hidden>
          <li className={`${styles.control} ${styles.close}`} />
          <li className={`${styles.control} ${styles.minimize}`} />
          <li className={`${styles.control} ${styles.maximize}`} />
        </ul>
        <p className={styles.terminal_title}>{displayTitle}</p>
        <span className={styles.terminal_hint}>Open</span>
      </header>
      <div className={styles.thumbnail_wrap}>
        {image ? (
          <Image
            src={image}
            alt=""
            className={styles.thumbnail}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
          />
        ) : (
          <div className={styles.thumbnail_placeholder} aria-hidden />
        )}
      </div>
      <div className={styles.body}>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </a>
  );
};
