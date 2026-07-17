---
name: opmc-module-set
description: Use when the user asks to set up, initialize, or update an OPMC module, create a module.yaml file, or define the module symbol and name for an OPMC project.
---

# OPMC Module Set

Create or update the module identity file.

```
npx @polycloudinc/opmc module set --symbol <symbol> --name <name>
```

- At least one of `--symbol` or `--name` must be provided.
- The CLI discovers `module.yaml` by walking up from the current directory. The search stops at `product.yaml`.
- If an existing `module.yaml` is found, it is updated in place.
- If no `module.yaml` is found by the time the search reaches `product.yaml`, a new one is created in the current directory.
- If no `product.yaml` is found in the ancestry, a warning is logged.

## Registry Configuration

If `npx` prompts about an unknown registry, run:

```
npm config set @polycloudinc:registry https://forgejo.aleisium.com/api/packages/aleisium/npm/
```
