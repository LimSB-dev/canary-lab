import styles from "./styles.module.scss";

export const MusicCard = () => {
  return (
    <article className={styles.card}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/sWtEYPva4A0?si=3ZguOBbVWGyS32vj&amp;controls=0`}
        title="YouTube video player"
        frameBorder={0}
        allowFullScreen
      />
    </article>
  );
};
