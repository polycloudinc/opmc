---
name: opmc-component-qualified-name
description: Use when the user asks for the OPMC qualified name of a component, needs to resolve component identity from yaml files, or wants to derive the full dashed or dotted component name from the current directory structure.
---

# OPMC Component Qualified Name

Resolve and emit the fully qualified component name by walking up the directory tree to find all four OPMC identity files.

```
npx @polycloudinc/opmc component qname --style dashed
npx @polycloudinc/opmc component qname --style dotted
```

- `--style dashed` produces `<org>-<product>-<module>-<component>` (e.g. `polycloud-opmc-cli-main`).
- `--style dotted` produces `<org>.<product>.<module>.<component>` (e.g. `polycloud.opmc.cli.main`).
- The CLI walks up from the current directory to find `component.yaml`, then `module.yaml`, then `product.yaml`, then `org.yaml`.
- If any file is missing in the expected hierarchy, an error is logged.

## Registry Configuration

If `npx` prompts about an unknown registry, run:

```
npm config set @polycloudinc:registry https://registry.npmjs.org/
```
