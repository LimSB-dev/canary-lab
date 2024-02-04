import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface modalSlice {
  status: "close" | "login";
}

// define initial state
const initialState = {
  status: "close",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      state.status = action.payload;
    },
    closeModal(state) {
      state.status = "close";
    },
  },
});

// action creators
export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
// reducer
export default modalSlice.reducer;
