# Turning Repetitive Work into Skills

This is a starter repo for a 30-minute workshop on converting repetitive engineering workflows into reusable `SKILL.md` files.

The example workflow is investigating and remediating dependency vulnerabilities using `pnpm audit`.

## Goal

The goal is not only to fix vulnerable dependencies. The goal is to capture the repeatable workflow in:

```text
.cursor/skills/dependency-vulnerability-remediation/SKILL.md
```

## Prerequisites

- Node.js 20+ (check with `node --version`)
- pnpm 9+

The recommended way to get pnpm is via Corepack, which ships with Node.js 16.10+:

```bash
corepack enable
corepack install -g pnpm@9
```

Verify the versions:

```bash
node --version
pnpm --version
```

No Snyk account, Snyk token, or external security platform is required.

## Disclaimer: these vulnerabilities will not compromise your laptop

Simply installing these old, vulnerable dependency versions will **not** compromise your machine. Installs are run with `--ignore-scripts` (and `.npmrc` enforces `ignore-scripts=true`), so no package install/postinstall scripts can execute.

All of the reported issues are library-level flaws that only become exploitable when:

- the vulnerable code path is actually called by a running application, and
- that application processes attacker-controlled input (for example, a public HTTP server parsing untrusted query strings, request bodies, or routes).

This repo ships a tiny demo and does not expose any such surface to the internet, so the packages just sitting in `node_modules` pose no risk to your laptop. They exist purely to give `pnpm audit` something to report for the workshop.

## What each vulnerability is (brief)

The CVE column links to the official advisory, which backs the disclaimer above: every one of these is a library-level flaw that requires the vulnerable code to be _called_ with attacker-controlled input, not something triggered by installing the package.

`D` = direct dependency, `T` = transitive (pulled in by `express`).

| Package        | Dep | Severity | Affected         | What it is                                                                            | CVE                                                                 |
| -------------- | --- | -------- | ---------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| minimist       | D   | critical | `<0.2.4`         | Prototype Pollution — crafted CLI args (e.g. `__proto__`) pollute `Object.prototype`. | [CVE-2021-44906](https://github.com/advisories/GHSA-xvch-5gv4-984h) |
| minimist       | D   | moderate | `<0.2.1`         | Earlier Prototype Pollution variant via `--__proto__` args.                           | [CVE-2020-7598](https://github.com/advisories/GHSA-vh95-rmgr-6w4m)  |
| lodash         | D   | high     | `<4.17.21`       | Command Injection via `_.template` template options.                                  | [CVE-2021-23337](https://github.com/advisories/GHSA-35jh-r3h4-6jhm) |
| lodash         | D   | high     | `>=3.7.0 <4.17.19` | Prototype Pollution via `_.zipObjectDeep` / deep paths.                             | [CVE-2020-8203](https://github.com/advisories/GHSA-p6mc-m468-83gw)  |
| lodash         | D   | high     | `>=4.0.0 <=4.17.23` | Code Injection via `_.template` import key names.                                  | [CVE-2026-4800](https://github.com/advisories/GHSA-r5fr-rjxr-66jc)  |
| lodash         | D   | moderate | `>=4.0.0 <4.17.21` | ReDoS — slow regex backtracking in string helpers.                                  | [CVE-2020-28500](https://github.com/advisories/GHSA-29mw-wpgm-hmr9) |
| lodash         | D   | moderate | `>=4.0.0 <=4.17.22` | Prototype Pollution in `_.unset` / `_.omit`.                                       | [CVE-2025-13465](https://github.com/advisories/GHSA-xxjr-mmjv-4gpg) |
| lodash         | D   | moderate | `<=4.17.23`      | Prototype Pollution via array-path bypass in `_.unset` / `_.omit`.                    | [CVE-2026-2950](https://github.com/advisories/GHSA-f23m-r3pf-42rh)  |
| express        | D   | moderate | `<4.19.2`        | Open Redirect via malformed URLs.                                                     | [CVE-2024-29041](https://github.com/advisories/GHSA-rv95-896h-c2vc) |
| express        | D   | low      | `<4.20.0`        | XSS via `response.redirect()`.                                                        | [CVE-2024-43796](https://github.com/advisories/GHSA-qw6h-vgh9-j6wx) |
| body-parser    | T   | high     | `<1.20.3`        | Denial of Service when URL encoding is enabled.                                       | [CVE-2024-45590](https://github.com/advisories/GHSA-qwcr-r2fm-qrc7) |
| path-to-regexp | T   | high     | `<0.1.10`        | Outputs backtracking regexes (ReDoS).                                                 | [CVE-2024-45296](https://github.com/advisories/GHSA-9wv6-86v2-598j) |
| path-to-regexp | T   | high     | `<0.1.12`        | ReDoS in generated route matchers.                                                    | [CVE-2024-52798](https://github.com/advisories/GHSA-rhx6-c78j-4q9w) |
| path-to-regexp | T   | high     | `<0.1.13`        | ReDoS via multiple route parameters.                                                  | [CVE-2026-4867](https://github.com/advisories/GHSA-37ch-88jc-xwx2)  |
| qs             | T   | high     | `>=6.7.0 <6.7.3` | Prototype Pollution via crafted query strings.                                        | [CVE-2022-24999](https://github.com/advisories/GHSA-hrpp-h998-j3pp) |
| qs             | T   | moderate | `<6.14.1`        | DoS via memory exhaustion (arrayLimit bypass, brackets).                              | [CVE-2025-15284](https://github.com/advisories/GHSA-6rw7-vpxm-498p) |
| qs             | T   | low      | `>=6.7.0 <=6.14.1` | DoS via arrayLimit bypass in comma parsing.                                         | [CVE-2026-2391](https://github.com/advisories/GHSA-w7fw-mjwx-w883)  |
| cookie         | T   | low      | `<0.7.0`         | Accepts out-of-bounds cookie name/path/domain characters.                             | [CVE-2024-47764](https://github.com/advisories/GHSA-pxg6-pf52-xh8x) |
| send           | T   | low      | `<0.19.0`        | Template injection leading to XSS.                                                    | [CVE-2024-43799](https://github.com/advisories/GHSA-m6fv-jmcg-4jfg) |
| serve-static   | T   | low      | `<1.16.0`        | Template injection leading to XSS.                                                    | [CVE-2024-43800](https://github.com/advisories/GHSA-cm22-4g7w-348p) |

Severities reported by `pnpm audit`: 1 critical, 8 high, 6 moderate, 5 low.

## Safe setup

This repo intentionally uses old dependency versions so `pnpm audit` has something to report.

Install dependencies without running package install scripts:

```bash
pnpm install --ignore-scripts
```

The repo also includes `.npmrc` with:

```ini
ignore-scripts=true
```

## Run the demo

```bash
pnpm security:audit
```

Optional high-severity-only audit:

```bash
pnpm security:audit:high
```

## Investigate dependencies

Use `pnpm why` to understand whether a vulnerable package is direct or transitive:

```bash
pnpm why lodash
pnpm why minimist
pnpm why express
```
