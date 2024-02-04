import { MetadataRoute } from "next";
import { META_DATA } from "@/constants/metadata";

export default function manifest(): MetadataRoute.Manifest {
  const { APP_ID, APP_NAME, APP_DESCRIPTION } = META_DATA;

  return {
    id: APP_ID,
    name: APP_NAME,
    short_name: APP_NAME,
    display: "standalone",
    description: APP_DESCRIPTION,
    orientation: "any",
    theme_color: "#fff555",
    background_color: "#efefef",
    start_url: "/",
    dir: "auto",
    scope: "/",
    lang: "ko",
    categories: ["education", "entertainment"],
    icons: [
      {
        src: "/favicon.ico",
        type: "image/x-icon",
        sizes: "any",
        purpose: "any",
      },
    ],
    display_override: [
      "browser",
      "fullscreen",
      "minimal-ui",
      "standalone",
      "window-controls-overlay",
    ],
    screenshots: [],
  };
}
