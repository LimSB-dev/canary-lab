import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface modalSlice {
  status: "close" | "login";
}

// 초기 상태 정의
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

// 액션 생성함수
export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
// 리듀서
export default modalSlice.reducer;
