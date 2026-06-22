import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/admin/", "/reset-password", "/api/"],
      },
    ],
    sitemap: "https://renewtracker.net/sitemap.xml",
    host: "https://renewtracker.net",
  };
}
