---
name: opmc-product-set
description: Use when the user asks to set up, initialize, or update an OPMC product, create a product.yaml file, or define the product symbol and name for an OPMC project.
---

# OPMC Product Set

Create or update the product identity file.

```
npx @polycloudinc/opmc product set --symbol <symbol> --name <name>
```

- At least one of `--symbol` or `--name` must be provided.
- The CLI discovers `product.yaml` by walking up from the current directory. The search stops at `org.yaml`.
- If an existing `product.yaml` is found, it is updated in place.
- If no `product.yaml` is found by the time the search reaches `org.yaml`, a new one is created in the current directory.
- If no `org.yaml` is found in the ancestry, a warning is logged.

## Registry Configuration

If `npx` prompts about an unknown registry, run:

```
npm config set @polycloudinc:registry https://registry.npmjs.org/
```
