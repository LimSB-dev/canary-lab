"use client";

import { useFormState } from "react-dom";

import styles from "./styles.module.scss";
import Link from "next/link";
import { PostData } from "@/types/post";
import dynamic from "next/dynamic";
import { useState } from "react";
import { OutputData } from "@editorjs/editorjs";
import { createPost } from "@/lib/actions";

const Editor = dynamic(() => import("../../common/editor/Editor"), {
  ssr: false,
});

const CreatePostForm = () => {
  const [initialState, setInitialState] = useState<PostData>({
    id: "",
    status: "draft",
    title: "",
    createdAt: "",
    deletedAt: "",
    updatedAt: "",
    likes: 0,
    views: 0,
    data: {
      time: 0,
      blocks: [],
      version: "2.29.0",
    },
    comments: [],
    tags: [],
  });

  const setData = (data: OutputData) => {
    setInitialState({ ...initialState, data: data });
  };

  const [state, dispatch] = useFormState(createPost, initialState);

  return (
    <form className={styles.form} action={dispatch}>
      <label htmlFor="title">
        제목
        <input id="title" type="text" placeholder="Title" />
      </label>
      <ul>
        <li>
          <label htmlFor="frontend">
            <input id="frontend" type="checkbox" />
            frontend
          </label>
        </li>
        <li>
          <label htmlFor="backend">
            <input id="backend" type="checkbox" />
            backend
          </label>
        </li>
        <li>
          <label htmlFor="design">
            <input id="design" type="checkbox" />
            design
          </label>
        </li>
      </ul>
      <div className={styles.editor_container}>
        <Editor
          data={initialState.data}
          onChange={setData}
          holder="editorjs-container"
        />
      </div>
      {state.errors?.status &&
        state.errors.status.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      <div>
        <Link href="/posts">Cancel</Link>
        <button type="button">Save as Draft</button>
        <button type="submit">Create Post</button>
      </div>
    </form>
  );
};

export default CreatePostForm;
