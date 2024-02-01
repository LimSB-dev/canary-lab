/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import styles from "./styles.module.scss";

export const RateCard = () => {
  const svgFile =
    "https://mazassumnida.wtf/api/v2/generate_badge?boj=clim03087";

  return (
    <article className={styles.card}>
      <Link
        href="https://solved.ac/clim03087"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <img src={svgFile} alt="solved.ac" width={"100%"} height={"100%"} />
      </Link>
    </article>
  );
};
