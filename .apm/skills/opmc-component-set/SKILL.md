---
name: opmc-component-set
description: Use when the user asks to set up, initialize, or update an OPMC component, create a component.yaml file, or define the component symbol and name for an OPMC project.
---

# OPMC Component Set

Create or update the component identity file.

```
npx @aleisium/opmc component set --symbol <symbol> --name <name>
```

- At least one of `--symbol` or `--name` must be provided.
- The CLI discovers `component.yaml` by walking up from the current directory. The search stops at `module.yaml`.
- If an existing `component.yaml` is found, it is updated in place.
- If no `component.yaml` is found by the time the search reaches `module.yaml`, a new one is created in the current directory.
- If no `module.yaml` is found in the ancestry, a warning is logged.

## Registry Configuration

If `npx` prompts about an unknown registry, run:

```
npm config set @aleisium:registry https://forgejo.aleisium.com/api/packages/aleisium/npm/
```
