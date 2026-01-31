import type { ProjectPreview } from "@/app/api/projects/getPreview";
import { ProjectsCardSwap } from "./ProjectsCardSwap";
import styles from "./styles.module.scss";

interface ProjectsSectionProps {
  previews: ProjectPreview[];
}

export const ProjectsSection = ({ previews }: ProjectsSectionProps) => {
  return (
    <section className={styles.section} aria-labelledby="projects-heading">
      <ProjectsCardSwap previews={previews} />
    </section>
  );
};
