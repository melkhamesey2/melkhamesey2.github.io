# Security audit

## Scope and threat model

The reviewed surface is a static GitHub Pages site. There is no backend, database, authentication, serverless function, contact-form receiver, user-submitted HTML or runtime data store.

Primary threats:

- accidental XSS or unsafe DOM construction in generated HTML;
- compromised or unnecessary third-party runtime dependencies;
- leaked credentials or private operational information;
- broken privacy-link compatibility;
- unsafe external links or background tracking;
- over-permissive GitHub Actions deployment behavior.

## Evidence

- `npm run validate`: PASS. Product schema, HTTPS store links, legacy mirror, prohibited patterns and new-tab link attributes were checked.
- `npm run check`: PASS. Astro check reported 0 errors, 0 warnings and 0 hints across 32 files.
- `npm run build`: PASS. Static output and route/content checks passed.
- `npm audit`: PASS. Final full dependency tree reported 0 vulnerabilities.
- `npm audit --omit=dev`: PASS. Production dependency set reported 0 vulnerabilities.
- Secret-pattern scan over source, public assets and workflow: no hits. The public email is intentional contact data copied from the public profile source.
- Browser console after local production preview: no error or warning entries on the checked routes.
- No JavaScript asset was emitted in `dist`; interface behavior is HTML/CSS-first. JSON-LD is static build-time metadata only.

## XSS and content handling

The site does not use `eval()`, `new Function()`, `document.write()`, `javascript:` URLs, inline event handlers, `innerHTML` or `dangerouslySetInnerHTML`. Astro's `set:html` is used only for build-time JSON-LD generated from controlled site/product data; it is not user input and is not executable JavaScript.

## Content Security Policy

Each page emits this meta CSP:

```text
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-src 'none'; worker-src 'none'; manifest-src 'self'; upgrade-insecure-requests
```

The browser console was clean against the local production preview. GitHub Pages does not provide full control over arbitrary response headers from this repository, so this report does not claim custom `X-Frame-Options`, `Permissions-Policy` or HSTS response headers. The meta CSP is a document-level control, not a replacement for server response headers.

## Dependencies

The initial Astro 5 toolchain audit reported 1 critical, 1 high and 1 low build-tree vulnerability. The toolchain was upgraded to Astro `7.3.3` and `@astrojs/check` `0.9.10`; the final full and production-only audits both reported 0 vulnerabilities. These packages are build-time dependencies; the deployed site has no runtime package loader.

## GitHub Actions

`.github/workflows/pages.yml` has separate build and deploy jobs, least-privilege permissions, PR build-only behavior, main-branch deployment only, concurrency cancellation, Node setup and official GitHub Actions pinned to verified tag commits. No `pull_request_target`, `write-all` or repository secrets are required.

## External resources and privacy

There are no remote fonts, remote CSS frameworks, tracking pixels, analytics, advertising SDKs, background API calls, geolocation calls or marketing cookies. External links are HTTPS-only and user initiated; all `target="_blank"` links include `rel="noopener noreferrer"`.

## Residual risks

- GitHub Pages repository creation, Pages source settings and Enforce HTTPS were not changed because CLI authentication is expired and no push was authorized during this local preparation phase.
- Lighthouse was not available in the inspected environment, so performance/accessibility/SEO scores are not claimed.
- Exact responsive runtime checks for every requested viewport still need a browser runner with explicit viewport control.
- Product screenshot assets, version, release date and exact current price were not present in the verified public source; unverified values remain omitted rather than guessed.
