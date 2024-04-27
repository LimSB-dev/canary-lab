import isString from "lodash/isString";
import styles from "./styles.module.scss";
import { OutputData } from "@editorjs/editorjs";

interface IProps {
  post: OutputData;
}
const editorJsHtml = require("editorjs-html");
const EditorJsToHtml = editorJsHtml();

const PostContent = ({ post }: IProps) => {
  const html = EditorJsToHtml.parse(post);
  return (
    <div key={post.time} className={`card-shadow ${styles.content}`}>
      {html.map((item: any, index: number) => {
        if (isString(item)) {
          return <div dangerouslySetInnerHTML={{ __html: item }} key={index} />;
        }
        return item;
      })}
    </div>
  );
};

export default PostContent;
