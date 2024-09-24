import Link from "next/link";
import styles from "./styles.module.scss";

export const SearchList = ({ searchResponse }: { searchResponse: IPost[] }) => {
  return (
    <ul className={styles.search_list}>
      {searchResponse.map((post) => (
        <li key={post.id} className={styles.search_list_item}>
          <Link
            href={`posts/${post.index}`}
            className={styles.search_list_link}
            passHref
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
