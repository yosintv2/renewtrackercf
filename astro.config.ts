import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  integrations: [react(), sitemap({
    changefreq: "weekly",
    lastmod: new Date(),
    serialize: (page) => {
      const path = new URL(page.url).pathname.replace(/\/$/, "") || "/";
      if (path === "/") {
        return { ...page, priority: 1.0, changefreq: "weekly" };
      }
      if (path.startsWith("/blog/")) {
        return { ...page, priority: 0.7, changefreq: "monthly" };
      }
      if (path.startsWith("/track/")) {
        return { ...page, priority: 0.6, changefreq: "monthly" };
      }
      if (path.startsWith("/compare/")) {
        return { ...page, priority: 0.7, changefreq: "monthly" };
      }
      if (path.startsWith("/domains/")) {
        return { ...page, priority: 0.6, changefreq: "monthly" };
      }
      if (["/blog", "/about", "/contact", "/privacy", "/terms"].includes(path)) {
        return { ...page, priority: 0.8, changefreq: "monthly" };
      }
      if (path.startsWith("/dashboard") || path.startsWith("/api")) {
        return undefined;
      }
      if (["/login", "/register", "/forgot-password", "/reset-password", "/admin"].includes(path)) {
        return { ...page, priority: 0.2, changefreq: "yearly" };
      }
      return { ...page, priority: 0.5, changefreq: "monthly" };
    },
  })],
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://www.renewtracker.net",
});
