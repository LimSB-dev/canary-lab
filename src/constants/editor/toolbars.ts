import { ICommand } from "@uiw/react-markdown-editor";
import { imageCommand, scrollCommand } from "./commands";
import { Commands } from "@uiw/react-markdown-editor/cjs/components/ToolBar";

export const TOOLBARS: (Commands | ICommand)[] = [
  "undo",
  "redo",
  "bold",
  "italic",
  "underline",
  "strike",
  "olist",
  "ulist",
  "todo",
  "quote",
  "code",
  "codeBlock",
  "link",
  // 현재 드래그 앤 드롭만 지원
  // imageCommand,
];

export const TOOLBARS_MODE: (Commands | ICommand)[] = [scrollCommand, "preview"];
