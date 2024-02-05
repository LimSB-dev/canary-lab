import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface themeSlice {
  city: string | null;
}

// define initial state
const initialState: themeSlice = { city: null };

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
  },
});

// action creators
export const { setCity } = locationSlice.actions;
export const selectTheme = (state: RootState) => state.theme;
// reducer
export default locationSlice.reducer;
