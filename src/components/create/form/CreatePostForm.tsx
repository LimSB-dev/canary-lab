"use client";

import { useFormState } from "react-dom";

import styles from "./styles.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useState } from "react";
import { OutputData } from "@editorjs/editorjs";
import { State, createPost } from "@/lib/actions";
import { Editor } from "@/components/common/editor";

interface IProps {
  post: OutputData;
  setPost: Dispatch<SetStateAction<OutputData>>;
}

const CreatePostForm = ({ post, setPost }: IProps) => {
  const initialState = {
    message: null,
    error: {},
  };

  const [state, dispatch] = useFormState<State, FormData>(
    createPost,
    initialState
  );

  return (
    <form className={styles.form} action={dispatch}>
      <label className={`card-shadow ${styles.card}`} htmlFor="title">
        <input
          id="title"
          className={styles.title_input}
          name="title"
          type="text"
          placeholder="제목을 입력해주세요."
        />
      </label>
      <ul className={styles.tag_container}>
        <li className={`card-shadow ${styles.tag}`}>
          <label htmlFor="frontend">
            <input id="frontend" type="checkbox" />
            frontend
          </label>
        </li>
        <li className={`card-shadow ${styles.tag}`}>
          <label htmlFor="backend">
            <input id="backend" type="checkbox" />
            backend
          </label>
        </li>
        <li className={`card-shadow ${styles.tag}`}>
          <label htmlFor="design">
            <input id="design" type="checkbox" />
            design
          </label>
        </li>
      </ul>
      <div className={`card-shadow ${styles.card} ${styles.editor_container}`}>
        <Editor
          blocks={post.blocks}
          onChange={setPost}
          holder="editorjs-container"
        />
      </div>
      {state.errors?.title &&
        state.errors.title.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      <div className={styles.button_container}>
        <Link className={`card-shadow ${styles.card}`} href="/posts">
          Cancel
        </Link>
        <button type="button" className={`card-shadow ${styles.card}`}>
          Save as Draft
        </button>
        <button type="submit" className={`card-shadow ${styles.card}`}>
          Create Post
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
