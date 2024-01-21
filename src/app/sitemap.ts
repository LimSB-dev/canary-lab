import { MetadataRoute } from "next";
import { META_DATA } from "@/constant/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const { APP_URL } = META_DATA;

  return [
    {
      url: `${APP_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
