---
description: OPMC CLI prerequisites — verify npx and the @polycloudinc/opmc package are available before executing OPMC commands
---

# OPMC Prerequisites

Before executing any OPMC command, verify `npx` is available:

```
npx --version
```

If `npx` is not found, tell the user: "Node.js is required to run OPMC commands. Install it from https://nodejs.org."

The `@polycloudinc/opmc` package is downloaded automatically by `npx` on first use. If it fails with a registry error, have the user run:

```
npm config set @polycloudinc:registry https://forgejo.aleisium.com/api/packages/aleisium/npm/
```
