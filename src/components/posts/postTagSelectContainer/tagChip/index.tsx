"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import styles from "./styles.module.scss";
import { setSelectedTagIds } from "@/store/modules/tag";

interface Props {
  tag: ITag;
  type: "header" | "card";
}

export const TagChip = ({ tag, type = "header" }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedTagIds } = useAppSelector((state) => state.tag);
  const selected = selectedTagIds.includes(tag.id);
  return type === "header" ? (
    <li>
      <button
        type="button"
        className={styles.header_chip}
        style={{
          color: tag.color,
          boxShadow: selected
            ? "inset 0 -1px 2px var(--card-shadow-color-up), inset 0 1px 2px var(--card-shadow-color-down)"
            : "",
          transform: selected ? "translateY(1px)" : "",
        }}
        onClick={() => {
          dispatch(setSelectedTagIds(tag.id));
        }}
      >
        {tag.name}
      </button>
    </li>
  ) : (
    <li
      className={styles.card_chip}
      style={{
        color: tag.color,
        border: `1px solid ${tag.color}`,
      }}
    >
      {tag.name}
    </li>
  );
};

export const SkeletonTagChip = ({ index }: { index: number }) => {
  return (
    <li key={index} className={styles.chip}>
      {index}
    </li>
  );
};
