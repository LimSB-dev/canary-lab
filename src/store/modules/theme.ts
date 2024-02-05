import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface themeSlice {
  theme: "light" | "dark";
}

// define initial state
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

// action creators
export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;
// reducer
export default themeSlice.reducer;
