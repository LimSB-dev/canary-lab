import { MetadataRoute } from "next";
import { META_DATA } from "@/constant/metadata";

export default function manifest(): MetadataRoute.Manifest {
  const { APP_ID, APP_NAME, APP_DESCRIPTION } = META_DATA;

  return {
    id: APP_ID,
    name: APP_NAME,
    short_name: APP_NAME,
    display: "standalone",
    description: APP_DESCRIPTION,
    orientation: "any",
    theme_color: "#ffcc12",
    background_color: "#222222",
    start_url: "/",
    dir: "auto",
    scope: "/",
    lang: "ko",
    categories: ["education", "entertainment"],
    icons: [
      {
        src: "/favicon.ico",
        type: "image/x-icon",
        sizes: "16x16",
      },
      {
        src: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    shortcuts: [
      {
        name: APP_NAME,
        url: "https://canary-lab.vercel.app/",
        description: APP_DESCRIPTION,
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
