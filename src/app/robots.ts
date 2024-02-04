import { MetadataRoute } from "next";
import { META_DATA } from "@/constants/metadata";

export default function robots(): MetadataRoute.Robots {
  const { APP_URL } = META_DATA;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
