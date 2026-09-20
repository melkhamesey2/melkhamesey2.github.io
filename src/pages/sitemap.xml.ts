import type { APIRoute } from "astro";
import products from "../data/products.json";

const baseRoutes = ["", "products/", "about/", "capabilities/", "privacy/", "support/", "security/", "privacy/gk-sound-system/"];
const routes = [...baseRoutes, ...baseRoutes.filter((route) => route !== "").map((route) => `ar/${route}`), "ar/"];

export const GET: APIRoute = () => {
  const productRoutes = products.filter((product) => product.visibility === "public").flatMap((product) => [`products/${product.slug}/`, `ar/products/${product.slug}/`]);
  const urls = [...routes, ...productRoutes];
  const body = urls.map((route) => `  <url><loc>https://melkhamesey2.github.io/${route}</loc></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
