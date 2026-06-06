---
name: opmc-product-qualified-name
description: Use when the user asks for the OPMC qualified name of a product, needs to resolve product identity from yaml files, or wants to derive the full dashed or dotted product name from the current directory structure.
---

# OPMC Product Qualified Name

Resolve and emit the fully qualified product name by walking up the directory tree to find the product and org identity files.

```
npx @aleisium/opmc product qname --style dashed
npx @aleisium/opmc product qname --style dotted
```

- `--style dashed` produces `<org>-<product>` (e.g. `als-opmc`).
- `--style dotted` produces `<org>.<product>` (e.g. `als.opmc`).
- The CLI walks up from the current directory to find `product.yaml`, then `org.yaml`.
- If either file is missing in the expected hierarchy, an error is logged.

## Registry Configuration

If `npx` prompts about an unknown registry, run:

```
npm config set @aleisium:registry https://forgejo.aleisium.com/api/packages/aleisium/npm/
```
