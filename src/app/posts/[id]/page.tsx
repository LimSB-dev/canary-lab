import styles from "./page.module.scss";
import type { Metadata, ResolvingMetadata } from "next";
import { PreviewRenderer } from "@/components/common/editor";
import { OutputData } from "@editorjs/editorjs";

export async function generateMetadata(
  { id }: PostDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const postData = await fetch(`${process.env.URL}/${id}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: postData?.title || "Posts",
    openGraph: {
      images: postData?.images || previousImages,
    },
    description: postData?.description || "Posts description goes here.",
  };
}

export default function PostDetail({ id }: PostDetailPageProps) {
  const data: OutputData = {
    time: 0,
    blocks: [],
    version: "2.29.0",
  };

  return (
    <main id="main-page" role="main" className={styles.main}>
      <h1>id: {id}</h1>
      <h2>Preview</h2>
      <div className="border rounded-md">
        {/* <div className="p-16">{data && <PreviewRenderer data={data} />}</div> */}
      </div>
    </main>
  );
}
