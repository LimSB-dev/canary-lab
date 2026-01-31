import Image from "next/image";
import type { ProjectPreview } from "@/app/api/projects/getPreview";
import styles from "./styles.module.scss";

interface ProjectCardProps {
  preview: ProjectPreview;
}

export const ProjectCard = ({ preview }: ProjectCardProps) => {
  const { url, title, description, image } = preview;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={title ?? "프로젝트 링크"}
    >
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
        <h3 className={styles.title}>{title ?? "제목 없음"}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </a>
  );
};
