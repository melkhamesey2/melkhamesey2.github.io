# Security audit

## Scope and threat model

The production surface is a static GitHub Pages site. There is no backend, database, authentication, serverless function, contact-form receiver, user-submitted HTML or runtime data store.

Primary threats reviewed:

- accidental XSS or unsafe DOM construction in generated HTML;
- compromised or unnecessary third-party runtime dependencies;
- leaked credentials or private operational information;
- broken privacy-link compatibility;
- unsafe external links or background tracking;
- over-permissive GitHub Actions deployment behavior.

## Verified evidence

- `npm run validate`: PASS.
- `npm run check`: PASS — 0 errors, 0 warnings, 0 hints.
- `npm run build`: PASS — 19 static pages.
- `npm audit`: PASS — 0 vulnerabilities.
- `npm audit --omit=dev`: PASS — 0 vulnerabilities.
- Secret/tracker scan: no findings.
- Runtime JavaScript emitted to `dist`: 0 bytes.
- GitHub Pages deployment: PASS.
- HTTPS enforcement: PASS via GitHub Pages API.
- Live route checks: PASS.
- Exact 10-viewport runtime matrix across EN/AR home and product pages: PASS for layout/overflow; lazy screenshots verified separately by scroll activation.
- Final Lighthouse: EN home 100/100/100/100; EN product 98/100/100/100; AR product 98/100/100/100 for Performance/Accessibility/Best Practices/SEO.

## XSS and content handling

The site does not use `eval()`, `new Function()`, `document.write()`, `javascript:` URLs, inline event handlers, `innerHTML` or `dangerouslySetInnerHTML`.

Astro `set:html` is used only for build-time JSON-LD generated from controlled site/product data; it is not user-submitted content and is not runtime executable JavaScript.

## Content Security Policy

Each page emits this document-level meta CSP:

```text
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-src 'none'; worker-src 'none'; manifest-src 'self'; upgrade-insecure-requests
```

GitHub Pages does not provide repository-level control over arbitrary response headers, so this audit does not claim custom `X-Frame-Options`, `Permissions-Policy` or custom HSTS headers. The meta CSP is a document-level control, not a replacement for server response headers.

## Dependencies

Astro is pinned through the lockfile and used only at build time. The deployed site has no runtime package loader. Final full and production-only npm audits both reported 0 vulnerabilities.

## GitHub Actions

`.github/workflows/pages.yml` uses separate build and deploy jobs, PR build-only behavior, a main-branch deploy gate, least-privilege permissions, concurrency cancellation and official actions pinned to verified immutable commit SHAs.

The action pins were refreshed to current releases that run cleanly under the GitHub Actions Node 24 transition. No `pull_request_target`, `write-all`, PAT, deployment key or repository secret is required.

## External resources and privacy

There are no remote fonts, remote CSS frameworks, tracking pixels, analytics, advertising SDKs, background API calls, geolocation calls or marketing cookies.

External links are HTTPS-only and user initiated. New-tab links are validated for safe relationship attributes.

## Residual risks and operational notes

- GitHub Pages still limits control over arbitrary HTTP response security headers.
- GitHub reports that the `ubuntu-latest` runner label is scheduled to migrate to Ubuntu 26 beginning 2026-10-19. Current builds are successful; re-verify the workflow after that runner migration.
- Store privacy URL migration remains intentionally separate from the site deployment.
- Product release date remains unpublished rather than inferred.
