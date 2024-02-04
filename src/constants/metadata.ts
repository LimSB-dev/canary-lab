const APP_ID = process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID;
const APP_NAME = "Canary Lab";
const APP_DEFAULT_TITLE = "Canary Lab";
const APP_TITLE_TEMPLATE = "%s | Canary Lab";
const APP_DESCRIPTION =
  "It is a laboratory and tech blog that experimentally implements several new functions.";
const APP_URL = "https://canary-lab.vercel.app/";
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "";
const NAVER_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "";

export const META_DATA = {
  APP_ID,
  APP_NAME,
  APP_DEFAULT_TITLE,
  APP_TITLE_TEMPLATE,
  APP_DESCRIPTION,
  APP_URL,
  GOOGLE_SITE_VERIFICATION,
  NAVER_SITE_VERIFICATION,
};
