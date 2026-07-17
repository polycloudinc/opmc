---
name: opmc-module-qualified-name
description: Use when the user asks for the OPMC qualified name of a module, needs to resolve module identity from yaml files, or wants to derive the full dashed or dotted module name from the current directory structure.
---

# OPMC Module Qualified Name

Resolve and emit the fully qualified module name by walking up the directory tree to find the module, product, and org identity files.

```
npx @polycloudinc/opmc module qname --style dashed
npx @polycloudinc/opmc module qname --style dotted
```

- `--style dashed` produces `<org>-<product>-<module>` (e.g. `polycloud-opmc-cli`).
- `--style dotted` produces `<org>.<product>.<module>` (e.g. `polycloud.opmc.cli`).
- The CLI walks up from the current directory to find `module.yaml`, then `product.yaml`, then `org.yaml`.
- If any file is missing in the expected hierarchy, an error is logged.

## Registry Configuration

If `npx` prompts about an unknown registry, run:

```
npm config set @polycloudinc:registry https://forgejo.aleisium.com/api/packages/aleisium/npm/
```
