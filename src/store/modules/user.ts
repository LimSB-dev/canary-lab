import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface ModalSlice {
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
  userType: "normal" | "admin";
}

const initialState: ModalSlice = {
  id: null,
  name: null,
  email: null,
  image: null,
  userType: "normal",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<ModalSlice>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.userType = action.payload.userType;
    },
    signOut(state) {
      state.id = null;
      state.name = null;
      state.email = null;
      state.image = null;
      state.userType = "normal";
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
