import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

const LAST_UPDATE = "2026-03-19";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: LAST_UPDATE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/events`, lastModified: LAST_UPDATE, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.5 },
  ];
}
