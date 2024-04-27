import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import EditorJS, { OutputData, OutputBlockData } from "@editorjs/editorjs";

import { EDITOR_TOOLS } from "@/constants/editor/editorTools";

export interface IEditorProps {
  blocks: OutputBlockData[];
  onChange: Dispatch<SetStateAction<OutputData>>;
  holder: string;
}

const Editor = ({ blocks, onChange, holder }: IEditorProps) => {
  const ref = useRef<EditorJS | null>();

  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data: {
          time: new Date().getTime(),
          blocks,
          version: "2.29.0",
        },
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
        autofocus: true,
        placeholder: "내용을 입력해주세요.",
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={holder} />;
};

export default Editor;
