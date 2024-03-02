import CreatePostForm from "@/components/create/form/CreatePostForm";
import styles from "./page.module.scss";

export default function Create() {
  return (
    <main className={styles.main}>
      <CreatePostForm />
    </main>
  );
}
