import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { set } from "lodash";

// state type
export interface postSlice {
  title: string;
  markdownValue: string;
  status: "read" | "edit";
}

// define initial state
const initialState: postSlice = {
  title: "",
  markdownValue: "글을 작성해주세요.",
  status: "read",
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
  },
});

// action creators
export const { setTitle, setMarkdownValue, setStatus } = postSlice.actions;
export const selectPost = (state: RootState) => state.post;
// reducer
export default postSlice.reducer;
