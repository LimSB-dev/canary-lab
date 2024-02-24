import { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import styles from "./styles.module.scss";

import { EDITOR_TOOLS } from "@/constants/editor/editorTools";

export interface IEditorProps {
  data: OutputData;
  onChange: (data: OutputData) => void;
  holder: string;
}

const Editor = ({ data, onChange, holder }: IEditorProps) => {
  const ref = useRef<EditorJS | null>();

  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          await api.saver
            .save()
            .then((outputData) => {
              onChange(outputData);
            })
            .catch((error) => {
              console.error("Saving failed: ", error);
            });
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={holder} className={`prose max-w-full`} />;
};

export default Editor;
