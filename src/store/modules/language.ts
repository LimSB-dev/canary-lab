import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type Locale = "cn" | "de" | "en" | "es" | "fr" | "it" | "ja" | "ko" | "pt" | "ru" | "zh";

export interface LanguageSlice {
  locale: Locale;
}

const defaultLocale: Locale = "ko";

const initialState: LanguageSlice = {
  locale: defaultLocale,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLocale(state, action: { payload: Locale }) {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = languageSlice.actions;
export const selectLocale = (state: RootState) => state.language.locale;
export default languageSlice.reducer;
