import type { MetadataRoute } from "next";
import { navigation, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map((item) => ({
    url: new URL(item.href, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : item.href === "/research" || item.href === "/publications" ? 0.9 : 0.7,
  }));
}
