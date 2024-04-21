"use client";

import { useFormState } from "react-dom";

import styles from "./styles.module.scss";
import Link from "next/link";
import { IPost } from "@/types/post";
import dynamic from "next/dynamic";
import { use, useState } from "react";
import { OutputData } from "@editorjs/editorjs";
import { State, createPost } from "@/lib/actions";

const Editor = dynamic(() => import("../../common/editor/Editor"), {
  ssr: false,
});

const CreatePostForm = () => {
  const initialState = {
    message: null,
    error: {},
  };

  const [post, setPost] = useState<IPost>({
    id: "",
    status: "draft",
    title: "",
    createdAt: "",
    deletedAt: "",
    updatedAt: "",
    likes: 0,
    views: 0,
    blocks: [],
    comments: [],
    tags: [],
  });

  const setData = (data: OutputData) => {
    setPost({ ...post, blocks: data.blocks });
  };

  const [state, dispatch] = useFormState<State, FormData>(
    createPost,
    initialState
  );

  return (
    <form className={styles.form} action={dispatch}>
      <label htmlFor="title">
        제목
        <input id="title" name="title" type="text" placeholder="Title" />
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
          blocks={post.blocks}
          onChange={setData}
          holder="editorjs-container"
        />
      </div>
      {state.errors?.title &&
        state.errors.title.map((error: string) => (
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
