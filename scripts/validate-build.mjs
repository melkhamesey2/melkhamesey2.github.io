import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const requiredRoutes = ["index.html", "products/index.html", "products/gk-sound-system/index.html", "about/index.html", "capabilities/index.html", "privacy/index.html", "privacy/gk-sound-system/index.html", "security/index.html", "support/index.html", "ar/index.html", "ar/products/index.html", "ar/products/gk-sound-system/index.html", "ar/privacy/index.html", "ar/privacy/gk-sound-system/index.html", "404.html", "robots.txt", "sitemap.xml"];
const errors = [];
if (!existsSync(dist)) errors.push("dist directory is missing");
for (const route of requiredRoutes) if (!existsSync(join(dist, route))) errors.push(`missing built route: ${route}`);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const htmlFiles = existsSync(dist) ? walk(dist).filter((file) => file.endsWith(".html")) : [];
const titles = new Map();
const canonicals = new Map();
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (!title) errors.push(`${file}: missing title`);
  if (!canonical) errors.push(`${file}: missing canonical`);
  if (title) titles.set(title, (titles.get(title) ?? 0) + 1);
  if (canonical) canonicals.set(canonical, (canonicals.get(canonical) ?? 0) + 1);
  if (!html.includes("Content-Security-Policy")) errors.push(`${file}: missing meta CSP`);
  if (!html.includes('name="referrer"')) errors.push(`${file}: missing referrer policy`);
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("data:") || /^https:\/\/(?!melkhamesey2\.github\.io)/i.test(href)) continue;
    const pathname = href.startsWith("https://melkhamesey2.github.io") ? new URL(href).pathname : href.split("#")[0].split("?")[0];
    const normalized = pathname.replace(/^\//, "");
    const candidate = normalized === "" ? join(dist, "index.html") : normalized.endsWith("/") ? join(dist, normalized, "index.html") : join(dist, normalized);
    if (!existsSync(candidate)) errors.push(`${file}: broken internal link ${href}`);
  }
}
for (const [title, count] of titles) if (count > 1) errors.push(`duplicate title: ${title}`);
for (const [canonical, count] of canonicals) if (count > 1) errors.push(`duplicate canonical: ${canonical}`);

const sitemap = existsSync(join(dist, "sitemap.xml")) ? readFileSync(join(dist, "sitemap.xml"), "utf8") : "";
if (!sitemap.includes("<urlset") || !sitemap.includes("https://melkhamesey2.github.io/")) errors.push("sitemap.xml is invalid or empty");
const robots = existsSync(join(dist, "robots.txt")) ? readFileSync(join(dist, "robots.txt"), "utf8") : "";
if (!robots.includes("Sitemap: https://melkhamesey2.github.io/sitemap.xml")) errors.push("robots.txt is missing the canonical sitemap");

if (errors.length) {
  console.error("Build validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Build validation passed: ${htmlFiles.length} HTML files and ${requiredRoutes.length} required routes.`);
