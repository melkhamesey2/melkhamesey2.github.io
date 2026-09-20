# GK DEVELOPMENT — Product & Developer Hub

Static English/Arabic product hub for GK DEVELOPMENT. It is designed for the dedicated `melkhamesey2.github.io` GitHub Pages repository and does not require a backend, database, CMS, analytics or runtime third-party scripts.

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

The profile repository remains the stable legacy source:

`https://github.com/melkhamesey2/melkhamesey2/blob/main/privacy/GK_SOUND_SYSTEM_PRIVACY_POLICY.md`

The new hub mirrors that material at `/privacy/gk-sound-system/` and `/ar/privacy/gk-sound-system/` without changing the old GitHub path or any store URL.

## Structure

- `src/data/` — central site and product data
- `src/components/` — shared layout and product templates
- `src/pages/` — generated English/Arabic routes
- `public/legacy-privacy/` — byte-preserved legacy policy mirror
- `scripts/` — content and build validation
- `.github/workflows/pages.yml` — least-privilege Pages workflow

## Security rules

The site has no backend, no authentication, no analytics, no trackers and no contact form backend. Keep all assets local, use HTTPS for external links, preserve `noopener noreferrer` on new-tab links, and never commit secrets or `.env` files.

## GitHub Pages deployment

Pull requests run build and validation only. A push to `main` is the only deployment trigger. Repository creation, Pages settings and the first publish are controlled separately from local build work.

For the first publish, create the dedicated repository `melkhamesey2/melkhamesey2.github.io`, then open **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source, and review the workflow run after the first push to `main`. The workflow uses the repository's built-in `GITHUB_TOKEN`; no PAT, deployment key or application secret is required. Do not migrate store privacy URLs until the live Pages site has been independently verified.
