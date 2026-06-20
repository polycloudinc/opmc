# OPMC

Tooling and agent context for working with the OPMC model (Org-Product-Module-Component). Available as an npm CLI, APM agent skills, and APM documentation strategy instructions.

## Setup

### CLI (npm)

Install Node.js, then configure the registry:

```
npm config set @aleisium:registry https://forgejo.aleisium.com/api/packages/aleisium/npm/
```

### Agent Skills (APM)

1.  Install [APM](https://microsoft.github.io/apm/) (not available via `npx`):

    ```
    curl -sSL https://aka.ms/apm-unix | sh
    ```

2.  Add the skills to your project:

    ```
    apm install ssh://git@forgejo.aleisium.com:222/aleisium/als_sys_app_opmc.git --ssh --target opencode
    ```

    The `--ssh` flag uses your existing SSH key. The `--target` flag is required on first install if no agent harness files (`.opencode/`, `.claude/`, `.cursor/`, etc.) exist in the project yet. Once any harness directory is present, `--target` becomes optional.

    If `apm install` adds a malformed dependency entry to `apm.yml` during resolution, edit it manually to use the full SSH URL:

    ```yaml
    dependencies:
      apm:
        - ssh://git@forgejo.aleisium.com:222/aleisium/als_sys_app_opmc.git
    ```

    Then run bare `apm install --ssh`.

This deploys OPMC agent skills into your project's harness directories so AI coding assistants can manage OPMC identity files automatically.

### Documentation Strategy (APM)

The package also includes documentation strategy instructions that guide AI agents on how to create and maintain OPMC documentation:

- **Vision documentation** (`**/doc/vision/**`) — purpose, audience, goals, scope, context
- **Product documentation** (`**/doc/product/**`) — module inventory, architecture, public API surface
- **Module documentation** (`**/doc/module/**`) — component inventory, internal architecture, dependencies, API contracts

These instructions are authored as APM instructions (`.instructions.md`) with `applyTo` globs. When installed, they compile into your project's agent context — either as per-file rules (`.claude/rules/`, `.cursor/rules/`, etc.) or folded into `AGENTS.md` / `CLAUDE.md` / `GEMINI.md`, depending on the target harness.

#### Using with an existing AGENTS.md

If your project already has a hand-authored `AGENTS.md`, enable managed-section mode so APM only updates a marked section while preserving your content:

1. Add markers to your `AGENTS.md`:
   ```
   <!-- apm:start -->
   <!-- apm:end -->
   ```

2. Add to your `apm.yml`:
   ```yaml
   compilation:
     agents_md:
       mode: managed_section
   ```

Run `apm compile` to regenerate the managed section only.

#### Version updates

To check for and apply newer versions of the instructions:

```
apm outdated          # see available updates
apm update            # apply updates, rewrite lockfile
apm install --frozen  # CI gate: fail on lockfile drift
apm audit             # post-install drift detection
```

### Run

All commands use `npx @aleisium/opmc`. If you haven't configured the registry, append `--registry=https://forgejo.aleisium.com/api/packages/aleisium/npm/` to the npx command.

## Commands

### `org set`

Set or update the organization identity.

Create a new org:

```
npx @aleisium/opmc org set --symbol als --name Aleisium
```

Update an existing org (add or change the name):

```
npx @aleisium/opmc org set --name "Aleisium Pty Ltd"
```

### `product set`

Set or update the product identity.

Create a new product:

```
npx @aleisium/opmc product set --symbol opmc --name "OPMC Model"
```

Update an existing product:

```
npx @aleisium/opmc product set --symbol opmc --name "Updated OPMC Model"
```

### `module set`

Set or update the module identity.

```
npx @aleisium/opmc module set --symbol cli --name "CLI Module"
```

### `component set`

Set or update the component identity.

```
npx @aleisium/opmc component set --symbol main --name "Main Component"
```

### `component qname`

Emit the fully qualified component name.

Dashed style:

```
npx @aleisium/opmc component qname --style dashed
```

Dotted style:

```
npx @aleisium/opmc component qname --style dotted
```

### `module qname`

Emit the fully qualified module name.

Dashed style:

```
npx @aleisium/opmc module qname --style dashed
```

Dotted style:

```
npx @aleisium/opmc module qname --style dotted
```

### `product qname`

Emit the fully qualified product name.

Dashed style:

```
npx @aleisium/opmc product qname --style dashed
```

Dotted style:

```
npx @aleisium/opmc product qname --style dotted
```
