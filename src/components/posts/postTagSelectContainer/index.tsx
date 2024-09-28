import { fetchTags } from "@/lib/fetch/tags";
import styles from "./styles.module.scss";
import { TagChip } from "./tagChip";

export const PostTagSelectContainer = async () => {
  const tags = await fetchTags();

  return (
    <div id="tag-container" className={styles.post_list_header}>
      <h1>POSTS</h1>
      <ul className={styles.tag_container}>
        {tags.map((tag) => {
          return <TagChip key={tag.id} tag={tag} />;
        })}
      </ul>
    </div>
  );
};

export const SkeletonPostTagSelectContainer = () => {
  return (
    <div id="tag-container" className={styles.post_list_header}>
      <h1>POST</h1>
      <ul className={styles.tag_container}>
        {Array(10)
          .fill(0)
          .map((index) => (
            <li key={index} className={styles.chip}>
              {index}
            </li>
          ))}
      </ul>
    </div>
  );
};
