# Content update guide

The site is data-driven. Most product updates should change one record in `src/data/products.json`, not page markup.

## Add a product

1. Copy the existing product object in `src/data/products.json`.
2. Give it a unique `id` and URL-safe `slug`.
3. Keep `visibility` set to `hidden` until the public status and store links are verified.
4. Add only HTTPS store links with an accurate `live`, `pending` or `private` status.
5. Run `npm run validate`, `npm run check` and `npm run build`.

The product templates automatically generate the English and Arabic product routes for every public record.

## Hide or change a product

- Hide: set `visibility` to `hidden`.
- Coming soon: set `visibility` to `coming-soon` and keep it out of public product grids until the content policy permits showing it.
- Change status: update `status` using the enum in `src/data/types.ts`.
- Change version, price or release date: update the corresponding verified field. Use `null` when the value is not verified.

## Add a store or screenshot

Add a `storeLinks` record with `name`, HTTPS `url`, `status` and `primary`. Never represent a `pending` link as live. Add official screenshots to the product record and `public/` only after the asset is provided and checked; do not use generated or stock imagery. Keep `heroImage`, `logo`, `screenshots` and `screenshotDimensions` aligned, and use meaningful alt text in the shared product template.

The GK SOUND SYSTEM record includes `version`, `price`, `currency`, `formats` and `interfaceLanguages` from verified product material. Its `lastUpdated` value is the date of the product-record refresh, not a release date; keep `releaseDate` as `null` unless a release date is independently verified.

## CTA and SEO

The primary CTA is derived from `storeLinks[0]`. Change it by changing the primary live store record. Update `seoTitle` and `seoDescription` in the same product record. Keep titles and descriptions unique.

Social preview links are generated from the central site/product layout. Update local files in `public/og/` when the brand or product preview needs to change; do not introduce remote image dependencies.

## Add a release

Update `version`, `releaseDate`, `lastUpdated` and the product description together. If the release changes privacy behavior, update the product policy and keep the legacy source path stable.

## Add or update privacy

1. Keep the original public privacy file in `melkhamesey2/melkhamesey2` unchanged unless a separate migration is approved.
2. Mirror the verified policy content in `src/data/privacy.ts`.
3. Keep the product route at `/privacy/<slug>/` and `/ar/privacy/<slug>/`.
4. Run the privacy URL compatibility and build checks.

## Commands

```text
npm ci
npm run validate
npm run check
npm run build
npm run preview
```

Do not add analytics, trackers, remote runtime scripts, secrets, backend forms or unverified public claims.
