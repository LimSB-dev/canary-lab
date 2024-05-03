import styles from "./styles.module.scss";

interface IProps {
  figure?: "square" | "circle";
  canClick?: boolean;
}

export const ImageCardShadow = ({
  figure = "square",
  canClick = true,
}: IProps) => {
  return (
    <div
      className={`${styles.image_card_shadow} ${
        canClick && "button-card-shadow"
      }`}
      style={{
        borderRadius: figure === "circle" ? "50%" : "",
      }}
    ></div>
  );
};
