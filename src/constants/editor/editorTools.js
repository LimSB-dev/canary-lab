import CheckList from "@editorjs/checklist";
import Code from "@calumk/editorjs-codeflask";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import NestedList from "@editorjs/nested-list";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Raw from "@editorjs/raw";
import Marker from "@editorjs/marker";
import Attaches from "@editorjs/attaches";
import Underline from "@editorjs/underline";
import Alert from "editorjs-alert";

export const EDITOR_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: "헤더를 넣으삼",
      levels: [1, 2, 3],
      defaultLevel: 3,
    },
    shortcut: "CMD+SHIFT+H",
  },
  paragraph: {
    class: Paragraph,
    config: {
      placeholder: "내용을 입력하삼",
    },
  },
  linkTool: {
    class: Link,
    config: {
      header: "", // get request header 선택사항
      //백엔드 데이터 가져오깅( Cross Origin에 주의)
      endpoint: "http://localhost:9004/editor/link",
    },
  },
  raw: {
    class: Raw,
    config: {
      placeholder: "플레이스 홀더랑",
    },
  },
  simImg: {
    class: SimpleImage,
    //No Config
  },
  image: {
    class: Image,
    config: {
      // Your backend file uploader endpoint
      byFile: "http://localhost:9004/uploadFile",

      // Your endpoint that provides uploading by Url
      byUrl: "http://localhost:9004/fetchUrl",
      buttonContent: "파일 올릴거얌",
      actions: [
        {
          name: "new_button",
          icon: "<svg>...</svg>",
          title: "New Button",
          toggle: true,
          action: (name) => {
            alert(`${name} button clicked`);
          },
        },
      ],
    },
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
    // No Config
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  embed: {
    class: Embed,
    inlineToolbar: true,
    config: {
      services: {
        youtube: true,
        coub: true,
      },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+O",
    config: {
      quotePlaceholder: "Quote 입력",
      captionPlaceholder: "Quote's 작자들",
    },
  },
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
      withHeadings: true,
    },
  },
  nestedlist: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  delimiter: {
    class: Delimiter,
    //No Config
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+W",
    config: {
      titlePlaceholder: "Title",
      messagePlaceholder: "Message",
    },
  },
  code: {
    class: Code,
    placeholder: "코드 적어주삼",
  },
  attaches: {
    class: Attaches,
    config: {
      /**
       * Custom uploader
       */
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        uploadByFile(file) {
          // your own uploading logic here
          return MyAjax.upload(file).then((response) => {
            return {
              success: 1,
              file: {
                url: response.fileurl,
                // any data you want
                // for example: name, size, title
              },
            };
          });
        },
      },
    },
  },
  marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
    //No Config
  },
  inlineCode: {
    class: InlineCode,
    shortcut: "CMD+SHIFT+C",
    //No Config
  },
  underline: {
    class: Underline,
    //No Config
  },
  alert: {
    class: Alert,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+A",
    config: {
      defaultType: "primary",
      messagePlaceholder: "Enter something",
    },
  },
};
