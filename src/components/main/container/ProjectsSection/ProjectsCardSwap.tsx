"use client";

import type { ProjectPreview } from "@/app/api/projects/getPreview";
import {
  CARD_SWAP_ANIMATION,
  CARD_SWAP_CARD_DISTANCE,
  CARD_SWAP_CARD_HEIGHT,
  CARD_SWAP_CARD_WIDTH,
  CARD_SWAP_EASING,
  CARD_SWAP_PAUSE_ON_HOVER,
  CARD_SWAP_SKEW_AMOUNT,
  CARD_SWAP_VERTICAL_DISTANCE,
} from "@/constants/cardSwap";
import { CardSwap, Card } from "./CardSwap";
import { ProjectCard } from "./ProjectCard";
import styles from "./styles.module.scss";

interface ProjectsCardSwapProps {
  previews: ProjectPreview[];
}

export const ProjectsCardSwap = ({ previews }: ProjectsCardSwapProps) => {
  return (
    <div className={styles.card_swap_wrap}>
      <CardSwap
        width={CARD_SWAP_CARD_WIDTH}
        height={CARD_SWAP_CARD_HEIGHT}
        cardDistance={CARD_SWAP_CARD_DISTANCE}
        verticalDistance={CARD_SWAP_VERTICAL_DISTANCE}
        animationConfig={CARD_SWAP_ANIMATION[CARD_SWAP_EASING]}
        pauseOnHover={CARD_SWAP_PAUSE_ON_HOVER}
        skewAmount={CARD_SWAP_SKEW_AMOUNT}
        easing={CARD_SWAP_EASING}
      >
        {previews.map((preview) => (
          <Card key={preview.url}>
            <ProjectCard preview={preview} />
          </Card>
        ))}
      </CardSwap>
    </div>
  );
};
