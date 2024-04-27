import { OutputData } from "@editorjs/editorjs";
import isString from "lodash/isString";
import styles from "./styles.module.scss";

const editorJsHtml = require("editorjs-html");
const EditorJsToHtml = editorJsHtml();

interface IProps {
  post: OutputData;
}

export default function PreviewRenderer({ post }: IProps) {
  const html = EditorJsToHtml.parse(post);
  return (
    <div key={post.time} className={`card-shadow ${styles.editor}`}>
      {html.map((item: any, index: number) => {
        if (isString(item)) {
          return <div dangerouslySetInnerHTML={{ __html: item }} key={index} />;
        }
        return item;
      })}
    </div>
  );
}
