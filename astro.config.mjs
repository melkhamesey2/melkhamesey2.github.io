import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://melkhamesey2.github.io",
  base: "/",
  output: "static",
  trailingSlash: "always",
  compressHTML: true,
});
