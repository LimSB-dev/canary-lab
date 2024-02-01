import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface themeSlice {
  theme: "light" | "dark";
}

// 초기 상태 정의
const initialState: themeSlice = { theme: "light" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

// 액션 생성함수
export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;
// 리듀서
export default themeSlice.reducer;
