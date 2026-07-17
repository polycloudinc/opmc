---
name: opmc-org-set
description: Use when the user asks to set up, initialize, or update an OPMC organization, create an org.yaml file, or define the organization symbol and name for an OPMC project.
---

# OPMC Org Set

Create or update the organization identity file.

```
npx @polycloudinc/opmc org set --symbol <symbol> --name <name>
```

- At least one of `--symbol` or `--name` must be provided.
- The CLI discovers `org.yaml` by walking up from the current directory.
- If an existing `org.yaml` is found in an ancestor directory, it is updated in place.
- If no `org.yaml` is found, a new one is created in the current directory.

## Registry Configuration

If `npx` prompts about an unknown registry, run:

```
npm config set @polycloudinc:registry https://forgejo.aleisium.com/api/packages/aleisium/npm/
```
