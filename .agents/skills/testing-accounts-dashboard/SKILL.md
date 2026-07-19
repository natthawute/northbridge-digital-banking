---
name: testing-accounts-dashboard
description: Test the Northbridge retail-banking Accounts Dashboard end-to-end (balance cards, filter bar, transactions table). Use when verifying UI, filtering, or theming changes in this Angular workspace (Angular 15+ after the MDC migration).
---

# Testing the Accounts Dashboard

## Environment
- Requires Node 16: `source ~/.nvm/nvm.sh && nvm use 16` (see `.nvmrc`). Newer Node versions may fail with the Angular tooling pinned in package.json.
- Install with `npm ci`. If library type-check errors mention `Symbol.dispose` in `@types/node`, ensure `@types/node` stays pinned to 16.x (older TS can't parse newer typings).

## Run the app
- `npx ng serve --port 4200`, then open http://localhost:4200/dashboard (root redirects there).
- Note: deep links via curl return "Cannot GET /dashboard" without an `Accept: text/html` header — use the browser, or curl `/` instead.

## Unit tests / lint / build
- Headless Chrome may fail to launch in sandboxed VMs: `~/.local/bin/google-chrome` may be a CDP proxy wrapper that Karma cannot launch. First try `export CHROME_BIN=/usr/bin/google-chrome-stable`; if that binary is missing, create a `--no-sandbox` wrapper and export it as `CHROME_BIN`:
  `printf '#!/bin/bash\nexec /usr/bin/google-chrome --no-sandbox --disable-gpu --disable-dev-shm-usage "$@"\n' > ~/bin/chrome-no-sandbox && chmod +x ~/bin/chrome-no-sandbox && export CHROME_BIN=~/bin/chrome-no-sandbox`
- `npm test` runs both projects headless once; `npm run lint`; `npm run build` builds library then app.
- The filter-bar "canary" tests assert Material form-field/select internals. Since the Angular 15 MDC migration they target the MDC classes (`.mat-mdc-form-field-flex`, `.mat-mdc-select`); if a future Material upgrade changes the DOM again, update the selectors rather than deleting the tests.

## Material MDC theming pitfalls (Angular 15+)
- A green build/tests do NOT prove theming is intact — always screenshot /dashboard and compare against baselines. Known regression pattern: the table header can silently lose its navy background because MDC cells inherit the row background; theme both `.mat-mdc-table .mat-mdc-header-row` and `.mat-mdc-header-cell` with sufficient specificity.
- Legacy selectors (`.mat-form-field-flex`, `.mat-select-value`, `.mat-header-cell`, `.mat-row`, etc.) map to `.mat-mdc-*` equivalents; the form-field underline has no 1:1 class — hide `.mdc-line-ripple` instead.
- Downstream consumers (northbridge-rewards-portal) import `@northbridge/ui-components/styles/keystone-theme` from the packed tarball; `projects/ui-components/ng-package.json` must keep the SCSS `assets` entry or the portal styles build breaks.
- Specs asserting table rows should query `tr.mat-mdc-row` (portal specs may still use legacy `tr.mat-row` until it migrates).

## Filter expectations (mock data in projects/retail-banking-app/src/assets/mock-transactions.json)
- 15 transactions total. Account type: Checking → 7 rows, Savings → 2 rows, Credit → 6 rows.
- Search matches merchant or category (case-insensitive); date filter matches exact ISO date; all filters AND together.
- If you change the mock data, update these expected counts.

## UI testing tips
- The account-type control is a legacy `mat-select`; options render in an overlay — click the field, then click the option.
- The date field is a native `<input type="date">`; type the full date (e.g. 05212024) after clicking the month segment, otherwise partial values are ignored.

## Deployment
- Pushes to main auto-deploy to GitHub Pages via .github/workflows/deploy-pages.yml → https://natthawute.github.io/northbridge-digital-banking/
- If the deploy fails with "Resource not accessible by integration" on "Create Pages site", Pages may need to be enabled once manually (Settings → Pages → Source: GitHub Actions).

## Devin Secrets Needed
- None. The app uses a fake, hard-coded SSO token; no real credentials are required.
