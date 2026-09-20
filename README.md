# GK DEVELOPMENT — Product & Developer Hub

Live site: https://melkhamesey2.github.io/

Static English/Arabic product hub for GK DEVELOPMENT. The site is deployed from the dedicated `melkhamesey2/melkhamesey2.github.io` repository and does not require a backend, database, CMS, analytics or runtime third-party scripts.

## Stack

- Astro static output
- TypeScript strict configuration
- Local CSS, SVG and WebP assets only
- JSON product records with build-time validation
- GitHub Pages Actions deployment from `main` only

## Local development

```text
npm ci
npm run dev
```

## Production build

```text
npm run check
npm run build
npm run preview
```

`npm run build` validates product content, builds static HTML, checks required routes, checks unique titles/canonicals, and validates `robots.txt` and `sitemap.xml`.

## Content updates

Products live in `src/data/products.json`. Add or update one record and keep unverified products hidden. See [CONTENT_UPDATE_GUIDE.md](CONTENT_UPDATE_GUIDE.md).

## Privacy compatibility

The profile repository remains the stable legacy privacy source:

`https://github.com/melkhamesey2/melkhamesey2/blob/main/privacy/GK_SOUND_SYSTEM_PRIVACY_POLICY.md`

The hub mirrors that material at `/privacy/gk-sound-system/` and `/ar/privacy/gk-sound-system/` without changing the old GitHub path or any store URL.

## Structure

- `src/data/` — central site and product data
- `src/components/` — shared layout and product templates
- `src/pages/` — English/Arabic routes
- `public/legacy-privacy/` — byte-preserved legacy policy mirror
- `scripts/` — content and build validation
- `.github/workflows/pages.yml` — least-privilege Pages workflow

## Security rules

The site has no backend, no authentication, no analytics, no trackers and no contact-form backend. Keep all assets local, use HTTPS for external links, preserve safe new-tab link attributes, and never commit secrets or `.env` files.

## GitHub Pages deployment

GitHub Pages is configured to use the custom GitHub Actions workflow.

- Pull requests run build/check/validation only.
- Pushes to `main` build and deploy.
- The workflow uses least-privilege permissions and official actions pinned to immutable commit SHAs.
- HTTPS enforcement is enabled.
- No PAT, deployment key or repository secret is required for the standard Pages deployment.

Do not migrate store privacy URLs automatically. Treat any future store-facing URL change as a separate controlled release task.

## Final production QA

The live site passed:

- exact responsive runtime checks from 320x568 through 2560x1440 across EN/AR home and product pages;
- Lighthouse with 100 Accessibility / 100 Best Practices / 100 SEO on checked routes;
- Performance 100 on the EN home page and 98 on EN/AR product pages;
- HTTPS, custom 404, OG/Twitter assets, product images and lazy-loading verification;
- dependency and secret/tracker audits.
