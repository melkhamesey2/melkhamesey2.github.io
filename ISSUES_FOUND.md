# Issues found

## Open / informational

| Severity | Issue | Impact | Recommended action | Status |
| --- | --- | --- | --- | --- |
| Info | GitHub Actions `ubuntu-latest` will migrate to Ubuntu 26 beginning 2026-10-19 | No current impact; current build and deploy jobs pass | Re-run and review the workflow after the runner-image migration | MONITOR |
| Info | Store privacy URL migration remains unchanged | Existing store privacy links continue using the stable legacy GitHub source | Review migration separately only after deciding to replace store-facing URLs | DEFERRED BY DESIGN |
| Info | Product release date is intentionally unpublished | No user-facing correctness impact | Add only when independently verified | INTENTIONAL |

## Resolved during final deployment QA

- GitHub CLI authentication: resolved; authenticated account verified.
- GitHub Pages repository creation: resolved.
- Pages source/build type: resolved; GitHub Actions workflow configured.
- HTTPS enforcement: resolved and verified.
- Lighthouse availability: resolved with a temporary, non-project Lighthouse execution.
- Exact responsive matrix: resolved with 40 runtime layout checks plus targeted lazy-image activation checks.
- GitHub Actions Node 20 deprecation warnings: resolved by refreshing pinned official action SHAs.
- Product breadcrumb contrast: resolved.
- Brand accessible-name mismatch: resolved.
- OG/Twitter assets: verified at the actual live `/og/` paths with HTTP 200.
