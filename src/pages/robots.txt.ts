import type { APIRoute } from "astro";

export const GET: APIRoute = () => new Response(
  "User-agent: *\nAllow: /\nDisallow: /404.html\nSitemap: https://melkhamesey2.github.io/sitemap.xml\n",
  { headers: { "Content-Type": "text/plain; charset=utf-8" } },
);
