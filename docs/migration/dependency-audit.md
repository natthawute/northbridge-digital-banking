# Dependency Compatibility Audit — Angular 14 → 18 Migration

Scope: `northbridge-digital-banking` (workspace root + `projects/ui-components`),
`vendor/payments-gateway-sdk`, and the downstream consumer `northbridge-rewards-portal`.

Migration path: 14 → 15 → 16 → 17 → 18, one major version per PR.

## Platform requirements per hop

| Hop | Node.js | TypeScript | zone.js |
| --- | --- | --- | --- |
| v15 | 14.20 / 16.13 / 18.10+ | >= 4.8 < 5.0 | 0.11.x / 0.12.x |
| v16 | 16.14 / 18.10+ | >= 4.9.3 < 5.2 | >= 0.13 |
| v17 | >= 18.13 | >= 5.2 < 5.6 | ~0.14.x |
| v18 | >= 18.19 | >= 5.4 < 5.6 | ~0.14.x |

## Verdicts

### northbridge-digital-banking (root `package.json`)

| Dependency | Current | Verdict | Target per hop (15 / 16 / 17 / 18) |
| --- | --- | --- | --- |
| `@angular/{animations,common,compiler,core,forms,platform-browser,platform-browser-dynamic,router,compiler-cli}` | 14.3.0 | needs version bump | 15.x / 16.x / 17.x / 18.x (via `ng update`) |
| `@angular/cdk`, `@angular/material` | 14.2.7 | needs version bump | 15.x / 16.x / 17.x / 18.x — **v15 hop includes the MDC migration (highest risk)** |
| `@angular/cli`, `@angular-devkit/build-angular` | 14.2.13 | needs version bump | 15.x / 16.x / 17.x / 18.x |
| `@angular-eslint/*` | 14.4.0 | needs version bump | 15.x / 16.x / 17.x / 18.x |
| `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` | 5.43.0 | needs version bump | 5.x ok / ^5.59 or 6.x / 6.x / 7.x (follow `@angular-eslint` peer ranges) |
| `eslint` | ^8.28.0 | compatible | 8.x works across all hops |
| `ng-packagr` | ^14.2.0 | needs version bump | 15.x / 16.x / 17.x / 18.x |
| `rxjs` | ~7.5.0 | compatible | 7.5+ satisfies Angular 15–18 (`^6.5.3 \|\| ^7.4.0`); bump to ~7.8 recommended once the SDK constraint is resolved (SDK pins `rxjs@~7.5.0`) |
| `zone.js` | ~0.11.4 | needs version bump | ~0.12 / ~0.13 / ~0.14 / ~0.14 |
| `typescript` | ~4.7.2 | needs version bump | ~4.9 / ~5.1 (>=4.9.3) / ~5.2 / ~5.4 |
| `tslib` | ^2.3.0 | compatible | no change needed |
| `@types/node` | 16.18.x | needs version bump | keep 16 / bump to 18 with Node 18 / 18 / 20 with Node 20 |
| Node.js (`.nvmrc` = 16) | 16 | needs version bump | 16 ok / 16 or 18 (move to 18) / >= 18.13 / >= 18.19 (recommend 20 LTS) |
| `karma` ~6.4, `karma-*` | 6.4 | compatible | works through v18 (Karma is deprecated upstream; migration to another runner is out of scope) |
| `jasmine-core` ~4.3, `@types/jasmine` ~4.0 | 4.x | needs version bump | ~4.5 / ~4.6 / ~5.1 / ~5.1 (per `ng update` recommendations) |
| `payments-gateway-sdk` (file:vendor) | 2.4.1 | **BLOCKED** | peer deps pin `@angular/core@^14.0.0` and `rxjs@~7.5.0` — see below |

### projects/ui-components (`@northbridge/ui-components`)

| Dependency | Current | Verdict | Notes |
| --- | --- | --- | --- |
| peer `@angular/common`, `@angular/core`, `@angular/material` | ^14.2.0 | needs version bump | bump to ^15 / ^16 / ^17 / ^18 per hop; public API surface must remain unchanged |
| `tslib` | ^2.3.0 | compatible | — |

### vendor/payments-gateway-sdk — BLOCKED

Peer dependencies: `@angular/core@^14.0.0`, `rxjs@~7.5.0`.

- v15 hop: peer conflict on `@angular/core@15` at `npm ci` time (npm v8 enforces peer resolution).
- v16 hop and beyond: hard gate — v16 removes ngcc, so any View Engine-only build of the SDK stops loading entirely; the peer range must be resolved at the latest before Phase 2.

Options (user decision required — not forced through):
1. Request an updated SDK release from the payments team with peer ranges covering Angular 15–18 (preferred long-term fix).
2. Vendor-patch: add an npm `overrides` entry (or edit the vendored `package.json` peer range) as an explicitly temporary measure, documented in the PR.
3. Isolate SDK usage behind an adapter so the app no longer depends on its Angular peer range directly.

### northbridge-rewards-portal (downstream consumer)

| Dependency | Current | Verdict | Notes |
| --- | --- | --- | --- |
| `@angular/*` 14.3.0, `@angular/material` 14.2.7, CLI 14.2.13 | 14.x | needs version bump | the portal must upgrade on the same 15→16→17→18 chain to keep consuming `@northbridge/ui-components`; until it does, the library's `^N` peer ranges will not match its Angular 14 install (verified per hop via tarball install + build + test) |
| `@northbridge/ui-components` | file:vendor 1.0.0 tgz | needs refresh per hop | replace the vendored tarball with the repacked library after each hop and re-run build + tests |
| `typescript` ~4.7.2, `zone.js` ~0.11.4, Node 16 | — | needs version bump | same per-hop targets as the banking app |

## Summary

- No dependency is blocked for the entire migration except **`payments-gateway-sdk`**, which requires a user decision (options above) at the latest before the 15→16 hop.
- Everything else is either compatible as-is or has a well-defined per-hop bump handled by `ng update` plus manual bumps (`ng-packagr`, `@angular-eslint`, zone.js, TypeScript, Node).
