const APP_ID = process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID;
const APP_NAME = "Canary Lab";
const APP_DEFAULT_TITLE = "Canary Lab";
const APP_TITLE_TEMPLATE = "%s | Canary Lab";
const APP_DESCRIPTION = {
  MAIN: "Tech blog that experimentally implements several new functions.",
  POSTS: "Check out interesting IT posts",
  LOGIN: "Login to Canary Lab",
  CREATE: "Create a new post",
};
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "";
const NAVER_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "";
const FIGMA_URL =
  "https://www.figma.com/file/2VdpF0IhNz4CTdi7JEaGzH/canary-lab?type=design&node-id=3-280&mode=design&t=aeKriIe49JtQarGx-0";

export const META_DATA = {
  APP_ID,
  APP_NAME,
  APP_DEFAULT_TITLE,
  APP_TITLE_TEMPLATE,
  APP_DESCRIPTION,
  APP_URL,
  GOOGLE_SITE_VERIFICATION,
  NAVER_SITE_VERIFICATION,
  FIGMA_URL,
};
