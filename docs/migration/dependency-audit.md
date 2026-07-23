# Dependency Compatibility Audit — Angular 14 → 18 Migration

Scope: `northbridge-digital-banking` (workspace root + `projects/ui-components`), `vendor/payments-gateway-sdk`, and the downstream consumer `northbridge-rewards-portal`.

Platform requirements per hop:

| Hop | Node | TypeScript | zone.js |
| --- | --- | --- | --- |
| v15 | 14.20 / 16.13 / 18.10+ | >= 4.8 < 5.0 | 0.11.x / 0.12.x |
| v16 | 16 / 18 | >= 4.9.3 < 5.2 | >= 0.13 |
| v17 | >= 18.13 | >= 5.2 < 5.6 | ~0.14 |
| v18 | >= 18.19 | >= 5.4 < 5.6 | ~0.14 |

## Verdicts

| Dependency | Current | Verdict | Target per hop (15 / 16 / 17 / 18) |
| --- | --- | --- | --- |
| `@angular/{core,common,compiler,forms,router,animations,platform-browser,platform-browser-dynamic,compiler-cli}` | 14.3.0 | needs version bump | 15.x / 16.x / 17.x / 18.x via `ng update` |
| `@angular/cli`, `@angular-devkit/build-angular` | 14.2.13 | needs version bump | 15.x / 16.x / 17.x / 18.x |
| `@angular/material`, `@angular/cdk` | 14.2.7 | needs version bump | 15.x (MDC migration required) / 16.x / 17.x / 18.x |
| `@angular-eslint/*` | 14.4.0 | needs version bump | 15.x / 16.x / 17.x / 18.x |
| `@typescript-eslint/*` | 5.43.0 | needs version bump | 5.x ok for v15–16; ^6/^7 for v17–18 (paired with `@angular-eslint`) |
| `eslint` | ^8.28.0 | compatible | 8.x works through v18 (`@angular-eslint@18` supports ESLint 8) |
| `ng-packagr` | ^14.2.0 | needs version bump | 15.x / 16.x / 17.x / 18.x |
| `typescript` | ~4.7.2 | needs version bump | ~4.9 (v15 accepts 4.8/4.9; going straight to 4.9 also satisfies v16) / ~4.9.5 / ~5.4 / ~5.4 |
| `rxjs` | ~7.5.0 | compatible | 7.5+ satisfies all hops; recommend bump to ~7.8 by v16+ (payments-gateway-sdk pins ~7.5.0 — see blocker) |
| `zone.js` | ~0.11.4 | needs version bump | ~0.12 (or keep 0.11.x) / ~0.13.x / ~0.14.x / ~0.14.x |
| `tslib` | ^2.3.0 | compatible | no change |
| Node.js (`.nvmrc` = 16) | 16 | needs version bump | 16 ok / 16 or 18 (move to 18) / >= 18.13 / >= 18.19 (recommend 20 LTS) |
| `@types/node` | 16.18.126 | needs version bump | keep 16.x while on Node 16; bump to 18.x/20.x with Node upgrade |
| `karma` ~6.4.0, `karma-chrome-launcher` ~3.1.0, `karma-coverage` ~2.2.0, `karma-jasmine` ~5.1.0, `karma-jasmine-html-reporter` ~2.0.0 | — | compatible | works through v18 (karma is deprecated upstream but still the supported Angular runner) |
| `jasmine-core` ~4.3.0, `@types/jasmine` ~4.0.0 | — | compatible | 4.x ok through v17; bump to ~5.1 at v18 per `ng update` recommendation |
| `@northbridge/ui-components` (workspace lib) | peers `^14.2.0` | needs version bump | bump peer deps `^15` / `^16` / `^17` / `^18` each hop; public API unchanged |
| `payments-gateway-sdk` (vendored, 2.4.1) | peers `@angular/core@^14.0.0`, `rxjs@~7.5.0` | **blocked** | see below |
| `northbridge-rewards-portal` (downstream) | Angular 14.3, consumes ui-components tarball | needs version bump | must be rebuilt/tested against the repacked library at every hop; its own Angular upgrade is owned by that team |

## Blocked: `payments-gateway-sdk`

The vendored SDK pins `@angular/core@^14.0.0` and `rxjs@~7.5.0` as peer dependencies.

- The v14→15 hop itself is **not** hard-blocked: the SDK ships compiled Ivy-partial output and npm peer resolution can be handled, but `npm ci` will fail strict peer resolution from v15 onward.
- From **v16** the hard constraint bites: ngcc is removed, and the strict peer range will block installs.

Options (user decision required before Phase 2):
1. **Request an updated SDK release** from the payments team with peer range `>=14 <19` (preferred, permanent fix).
2. **Vendor-patch / `overrides`**: temporarily widen the peer range via npm `overrides` (or edit the vendored `package.json`), documented as a temporary measure until option 1 lands.
3. **Isolate behind an adapter**: wrap SDK usage in an app-owned adapter so the dependency can be swapped or stubbed.

No blocker affects the 14→15 hop itself, so Phase 1 proceeds; a decision is needed at the latest before the 15→16 hop.
