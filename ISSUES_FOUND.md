# Issues found

| Severity | Issue | Impact | Recommended fix | Scope |
| --- | --- | --- | --- | --- |
| Warning | GitHub CLI authentication is expired | Repository creation and push cannot be completed safely | Re-authenticate manually, then create `melkhamesey2.github.io` and review the first Pages run | In scope, pending user authentication |
| Warning | GitHub Pages Enforce HTTPS not yet verified | HTTPS readiness cannot be claimed before the repository exists | Enable and verify Enforce HTTPS in repository Pages settings | In scope, post-creation |
| Warning | Lighthouse was not installed or available | Numeric performance/accessibility/SEO scores are not available | Run Lighthouse against the production build or first live Pages URL | In scope, post-auth QA |
| Warning | Full 10-size responsive matrix was not runtime-captured | Exact clipping behavior at every requested size is not independently evidenced | Use a browser runner with explicit viewport control and record screenshots/results | In scope, post-auth QA |
| Info | Official product screenshots, exact version, release date and current price were not in the verified public source | Product page omits unverified claims and image gallery | Add verified assets/data through `src/data/products.json` only when supplied | In scope, content update |
| Info | Store privacy URL migration remains unchanged | Existing store links continue to point at the stable legacy GitHub source | Review migration separately after live-site verification | Out of current deployment scope |
