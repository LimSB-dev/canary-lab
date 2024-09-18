import styles from "./page.module.scss";

const SkeletonPostDetail = () => {
  return (
    <>
      <h1 className={styles.title}>Now Loading...</h1>
      <p>Please wait a moment</p>
    </>
  );
};

export default async function PostDetailPage() {
  return (
    <main id="main-page" role="main" className={styles.main}>
      <SkeletonPostDetail />
    </main>
  );
}
