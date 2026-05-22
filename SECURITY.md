# Security Policy

This repo contains the browsefleet.com marketing site, not the BrowseFleet server itself. Server security issues belong in the [server repo](https://github.com/theRJMurray/browsefleet/blob/master/SECURITY.md).

## What we treat as a security issue here

- Cross-site scripting in rendered content.
- Leaked secrets in the public build output, source, or repo history (API keys, tokens, private endpoints).
- Misconfigured CSP, CORS, or referrer policy that exposes operator data.
- Build-time dependency vulnerabilities (CVE in `next`, `react`, etc.) that are exploitable in our build.

## Reporting

Do **not** open a public GitHub Issue. Email:

> `therjmurray+browsefleet-sec@gmail.com`

Include the page URL, a reproduction, and the affected commit SHA. We acknowledge within one business day, triage within five.

## Out of scope

- Aesthetic issues, broken external links, typos.
- Self-inflicted issues in someone else's fork.
- Reports from automated scanners without manual validation.
