import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface themeSlice {
  theme: Theme;
}

// define initial state
const initialState: themeSlice = { theme: "system" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /**
     * Set the theme of the app when the user clicks the theme toggle button
     * @param state
     * @param action
     */
    setThemeWhenToggleClick(state, action) {
      state.theme = action.payload;
    },
    /**
     * Set the theme of the app when the user's system theme changes
     * @param state
     * @param action
     */
    setThemeWhenSystemChange(state, action) {
      if (state.theme === "system") {
        document.documentElement.setAttribute("data-theme", action.payload);
      }
    },
  },
});

// action creators
export const { setThemeWhenToggleClick, setThemeWhenSystemChange } =
  themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;
// reducer
export default themeSlice.reducer;
