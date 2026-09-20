import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const products = JSON.parse(readFileSync(join(root, "src", "data", "products.json"), "utf8"));
const site = JSON.parse(readFileSync(join(root, "src", "data", "site.json"), "utf8"));
const required = ["id", "name", "slug", "shortDescription", "fullDescription", "status", "visibility", "platforms", "category", "version", "price", "currency", "pricingModel", "heroImage", "logo", "screenshots", "screenshotDimensions", "formats", "interfaceLanguages", "features", "technologies", "storeLinks", "website", "privacyUrl", "supportUrl", "releaseDate", "lastUpdated", "featured", "sortOrder", "seoTitle", "seoDescription"];
const errors = [];
const seenSlugs = new Set();

if (!site.name || !site.github || !site.itch || !site.medium || !site.reddit || !site.contactEmail) errors.push("site.json is missing a required public configuration value");
if (!existsSync(join(root, "public", "legacy-privacy", "GK_SOUND_SYSTEM_PRIVACY_POLICY.md"))) errors.push("legacy privacy mirror is missing");

for (const product of products) {
  for (const key of required) if (!(key in product)) errors.push(`${product.id ?? "unknown"}: missing required field ${key}`);
  if (seenSlugs.has(product.slug)) errors.push(`duplicate product slug: ${product.slug}`);
  seenSlugs.add(product.slug);
  if (product.visibility === "public" && product.status === "hidden") errors.push(`${product.slug}: hidden product cannot be public`);
  for (const asset of [product.heroImage, product.logo, ...(product.screenshots ?? [])].filter(Boolean)) {
    if (!existsSync(join(root, "public", asset.replace(/^\//, "")))) errors.push(`${product.slug}: missing local asset ${asset}`);
  }
  for (const link of product.storeLinks ?? []) {
    if (!/^https:\/\//.test(link.url)) errors.push(`${product.slug}: store link must use HTTPS: ${link.name}`);
    if (link.status === "pending" && link.primary) errors.push(`${product.slug}: pending store link cannot be primary`);
  }
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const sourceFiles = [join(root, "src")].flatMap(walk).filter((file) => /\.(astro|ts|json|css)$/.test(file));
for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  const scanText = text.replace("http://www.sitemaps.org/schemas/sitemap/0.9", "");
  const rel = relative(root, file);
  for (const [pattern, label] of [[/http:\/\//, "insecure HTTP URL"], [/javascript:/i, "javascript URL"], [/on(?:click|error|load)\s*=/i, "inline event handler"], [/unsafe-eval/i, "unsafe-eval"], [/console\.log/, "console.log"], [/debugger\b/, "debugger statement"], [/localhost|127\.0\.0\.1/i, "local development host"]]) {
    if (pattern.test(scanText)) errors.push(`${rel}: contains ${label}`);
  }
  const blankTargets = [...text.matchAll(/target=["']_blank["']/g)].length;
  const safeBlankTargets = [...text.matchAll(/target=["']_blank["'][^>]*rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/g)].length;
  if (blankTargets !== safeBlankTargets) errors.push(`${rel}: target=_blank link is missing noopener noreferrer`);
}

if (errors.length) {
  console.error("Content validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Content validation passed: ${products.length} product record(s), ${sourceFiles.length} source file(s).`);
