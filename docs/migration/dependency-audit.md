# Dependency Compatibility Audit — Angular 14 → 18 Migration

Scope: `northbridge-digital-banking` (workspace: `retail-banking-app`, `ui-components`),
downstream consumer `northbridge-rewards-portal`, and vendored `payments-gateway-sdk`.

Platform requirements per hop:

| Hop | Node | TypeScript | zone.js |
|-----|------|-----------|---------|
| v15 | 14.20 / 16.13 / 18.10+ | >= 4.8 < 5.0 | 0.11.x / 0.12.x |
| v16 | 16 / 18 | >= 4.9.3 < 5.1 | >= 0.13 |
| v17 | >= 18.13 | >= 5.2 < 5.5 | ~0.14 |
| v18 | >= 18.19 | >= 5.4 < 5.6 | ~0.14 |

## Verdicts

| Dependency | Current | Verdict | Target per hop (15 / 16 / 17 / 18) |
|---|---|---|---|
| `@angular/{core,common,compiler,forms,router,animations,platform-browser*,compiler-cli}` | 14.3.0 | needs version bump | 15.x / 16.x / 17.x / 18.x via `ng update` |
| `@angular/cli`, `@angular-devkit/build-angular` | 14.2.13 | needs version bump | 15.x / 16.x / 17.x / 18.x |
| `@angular/material`, `@angular/cdk` | 14.2.7 | needs version bump (v15 hop includes the MDC migration — highest-risk step) | 15.x / 16.x / 17.x / 18.x |
| `ng-packagr` | ^14.2.0 | needs version bump | 15.x / 16.x / 17.x / 18.x |
| `@angular-eslint/*` | 14.4.0 | needs version bump | 15.x / 16.x / 17.x / 18.x |
| `@typescript-eslint/*` + `eslint` | 5.43.0 / ^8.28 | needs version bump (TS 5.2+ at v17 requires @typescript-eslint 6+; bumped alongside @angular-eslint) | 5.x / 5.62 / 6.x+ / 7.x |
| `typescript` | ~4.7.2 | needs version bump | ~4.9 / ~4.9.5 / ~5.2 / ~5.4 |
| `rxjs` | ~7.5.0 | compatible through v18 (7.4+ accepted); recommend bump to ~7.8 once `payments-gateway-sdk` peer pin (`~7.5.0`) is resolved | ~7.5 (pinned by SDK) → ~7.8 |
| `zone.js` | ~0.11.4 | needs version bump | ~0.12 / ~0.13 / ~0.14 / ~0.14 |
| `tslib` | ^2.3.0 | compatible | — |
| Node.js (`.nvmrc` = 16) | 16 | needs version bump at v17 | 16 / 18 (recommended) / >=18.13 / 20 LTS (recommended) |
| `@types/node` | 16.18.126 | needs version bump alongside Node | 16.x / 18.x / 18.x / 20.x |
| `karma` ~6.4, `karma-*` | ~6.4.0 | compatible through v18 (karma is deprecated by the Angular team but remains the supported default builder) | — |
| `jasmine-core` ~4.3, `@types/jasmine` ~4.0 | 4.x | compatible through v17; bump to ~5.1 at v18 (CLI default) | 4.x / 4.x / 4.x / ~5.1 |
| `@northbridge/ui-components` (this workspace) | peer `^14.2.0` | needs peer-dep bump each hop; public API must remain unchanged (downstream: rewards-portal) | ^15 / ^16 / ^17 / ^18 |
| **`payments-gateway-sdk` (vendored, v2.4.1)** | peer `@angular/core@^14.0.0`, `rxjs@~7.5.0` | **BLOCKED** | see below |

## Blocked dependency: `payments-gateway-sdk`

`vendor/payments-gateway-sdk` pins `@angular/core@^14.0.0` and `rxjs@~7.5.0` as peer
dependencies. From v15 onward, `npm ci` peer resolution fails; the compiled output itself is
plain JS + typings (no ngcc/View Engine issue detected), so the pin appears to be
declaration-only, but this must be decided by the user before Phase 2 at the latest.

Options (user decision required):
1. **Request an updated SDK release** from the payments team with widened peer ranges
   (`@angular/core >=14 <19`, `rxjs ^7.5`). Cleanest, but depends on another team.
2. **Vendor-patch the peer range** in `vendor/payments-gateway-sdk/package.json` (or use npm
   `overrides` / `--legacy-peer-deps`) as an explicitly temporary measure, documented in the PR.
3. **Isolate SDK usage behind an adapter** so the app compiles without direct SDK type
   coupling, deferring the peer conflict.

For the 14 → 15 hop itself: `^14.0.0` does not satisfy Angular 15, so `npm ci` strict peer
resolution breaks already at this hop. Interim measure used in PR 1 (pending user decision):
`--legacy-peer-deps`-free approach via npm `overrides` is NOT applied; instead the vendored
package's peer range is left untouched and installs are performed with `--legacy-peer-deps`,
called out explicitly as temporary.

## Downstream consumer: `northbridge-rewards-portal`

Angular 14.3.0, consumes `@northbridge/ui-components` via
`vendor/northbridge-ui-components-1.0.0.tgz`. The portal must build and pass tests against
each repacked library (it uses `NbTableDensityDirective` directly in specs). The portal's own
Angular upgrade is a separate effort; the library keeps `^N` peer ranges per hop, meaning the
portal must upgrade in lockstep or continue using the last compatible tarball. Verified per
hop by installing the freshly packed tarball and running its build + tests.

Findings from the v15 hop verification:

- A library built with Angular 15 is **not consumable by the portal while it stays on
  Angular 14** (`TS2707` on the emitted `ɵɵComponentDeclaration` typings, plus peer-dep
  conflict). The portal must upgrade to Angular 15 in lockstep or keep the last v14 tarball.
- Verified with the portal checkout locally upgraded to Angular 15: build and all 5 specs
  pass against the repacked library. The only portal-side change needed besides the upgrade
  itself is the legacy → MDC class rename in one spec (`tr.mat-row` → `tr.mat-mdc-row`).
- The original v14 tarball shipped `styles/_keystone-theme.scss`, but the workspace's
  `ng-package.json` never copied it (the vendored tarball had been packed by hand). Fixed by
  adding an `assets` rule and a `./styles/*` subpath export so `npm pack` of `dist` is
  self-sufficient.

## Baseline (recorded before any upgrade command)

- `npm run build` — green on `main` (both projects)
- `npm test` — green on `main` (5 + 5 specs, ChromeHeadless)
- Baseline screenshot of `http://localhost:4200/dashboard` captured (kept outside the repo)
