import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { set } from "lodash";

// state type
export interface postSlice {
  title: string;
  markdownValue: string;
  status: "read" | "edit";
  offset: number;
}

// define initial state
const initialState: postSlice = {
  title: "",
  markdownValue: "글을 작성해주세요.",
  status: "read",
  offset: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    /**
     * Set the markdown value when the user types in the markdown editor
     * @param state
     * @param action
     */
    setMarkdownValue(state, action) {
      state.markdownValue = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setResetPost(state) {
      state.title = "";
      state.markdownValue = "글을 작성해주세요.";
    },
    setOffset(state, action) {
      state.offset = state.offset + action.payload;
    },
    setResetFlag(state) {
      state.offset = 0;
    },
  },
});

// action creators
export const {
  setTitle,
  setMarkdownValue,
  setStatus,
  setResetPost,
  setOffset,
  setResetFlag,
} = postSlice.actions;
export const selectPost = (state: RootState) => state.post;
// reducer
export default postSlice.reducer;
