import { MetadataRoute } from "next";
import { META_DATA } from "@/constants/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const { APP_URL } = META_DATA;

  return [
    {
      url: `${APP_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${APP_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
