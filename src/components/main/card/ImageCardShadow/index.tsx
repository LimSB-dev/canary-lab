import styles from "./styles.module.scss";

interface IProps {
  figure?: "square" | "circle";
}

export const ImageCardShadow = ({ figure = "square" }: IProps) => {
  return (
    <div
      className={styles.image_card_shadow}
      style={{
        borderRadius: figure === "circle" ? "50%" : "",
      }}
    ></div>
  );
};
