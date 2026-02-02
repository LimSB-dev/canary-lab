import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface snackbarSlice {
  message: string;
  isActive: boolean;
}

// define initial state
const initialState = {
  message: "",
  isActive: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackBarSuccess(state, action) {
      const temp = state;
      temp.message = action.payload;
      temp.isActive = true;
    },
    closeSnackBarSuccess(state) {
      const temp = state;
      temp.isActive = false;
    },
  },
});

// action creators
export const { openSnackBarSuccess, closeSnackBarSuccess } = snackbarSlice.actions;
export const selectSnackbar = (state: RootState) => state.snackbar;
// reducer
export default snackbarSlice.reducer;
