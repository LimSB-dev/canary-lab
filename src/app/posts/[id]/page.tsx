import styles from "./page.module.scss";
import type { Metadata } from "next";
// import { PreviewRenderer } from "@/components/common/editor";
// import { fetchPostById } from "@/app/api/data";

export const metadata: Metadata = {
  title: "Posts Detail",
};

export default function PostDetail({ params }: { params: { id: string } }) {
  return (
    <main id="main-page" role="main" className={styles.main}>
      <h1>id: {params.id}</h1>
      <h2>Preview</h2>
      <div className="border rounded-md">
        {/* <div className="p-16">{data && <PreviewRenderer data={data} />}</div> */}
      </div>
    </main>
  );
}
