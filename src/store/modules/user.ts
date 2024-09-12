import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface modalSlice {
  name: string | null;
  email: string | null;
  image: string | null;
}

// define initial state
const initialState = {
  name: null,
  email: null,
  image: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    signOut(state) {
      state.name = null;
      state.email = null;
      state.image = null;
    },
  },
});

// action creators
export const { signIn, signOut } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
// reducer
export default userSlice.reducer;
