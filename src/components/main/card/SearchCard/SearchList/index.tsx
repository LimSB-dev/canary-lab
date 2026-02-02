import Link from "next/link";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { isEmpty } from "lodash";

export const SearchList = ({
  search,
  searchResponse,
}: {
  search: string;
  searchResponse: IPost[];
}) => {
  return (
    <ul className={styles.search_list}>
      {search &&
        (isEmpty(searchResponse) ? (
          <li className={styles.loading}>
            <p>{search}에 대한 </p>
            <p>검색 결과가 없습니다.</p>
          </li>
        ) : (
          searchResponse.map((post) => (
            <li key={post.id} className={styles.search_list_item}>
              <Link href={`posts/${post.index}`} className={styles.search_list_link} passHref>
                {post.title}
              </Link>
            </li>
          ))
        ))}
    </ul>
  );
};

export const SkeletonSearchList = () => {
  return (
    <div className={styles.loading}>
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
};
