import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { isEmpty, set } from "lodash";

// state type
export interface tagSlice {
  selectedTagIds: string[];
  name: string;
  color: string;
}

// define initial state
const initialState: tagSlice = {
  selectedTagIds: [],
  name: "",
  color: "",
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setSelectedTagIds(state, action) {
      const tagId = action.payload;

      if (state.selectedTagIds) {
        const index = state.selectedTagIds.indexOf(tagId);

        if (index !== -1) {
          // 배열에서 tagId 제거
          state.selectedTagIds.splice(index, 1);
        } else {
          // 배열에 tagId 추가
          state.selectedTagIds.push(tagId);
        }
      } else {
        // 배열 초기화 후 추가
        state.selectedTagIds = [tagId];
      }
    },
    resetSelectedTagIds(state) {
      state.selectedTagIds = [];
    },
    setTag(state, action) {
      state.name = action.payload.name;
      state.color = action.payload.color;
    },
    resetTag(state) {
      state.name = "";
      state.color = "";
    },
  },
});

// action creators
export const { setSelectedTagIds, resetSelectedTagIds, setTag, resetTag } = tagSlice.actions;
export const selectPost = (state: RootState) => state.tag;
// reducer
export default tagSlice.reducer;
