import { EditorSelection } from "@codemirror/state";
import { ICommand } from "@uiw/react-markdown-editor";

const scrollCommand: ICommand = {
  name: "scroll",
  keyCommand: "scroll",
  button: { "aria-label": "Enable scroll" },
  icon: (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        stroke: "var(--color-fg-default)",
        transition: "stroke 0.2s ease-in-out",
      }}
    >
      <rect x="0.75" y="0.75" width="8.5" height="14.5" rx="4.25" strokeWidth="1.5" />
      <circle cx="5" cy="5" r="1.25" strokeWidth="1.5" />
    </svg>
  ),
  execute: ({ state, view }) => {
    if (!state || !view) return;
    view.dispatch({
      selection: EditorSelection.cursor(0),
    });
  },
};

export default scrollCommand;
