---
template: '[[Ticket]]'
kind: ticket
tags:
- ticket
code: OPMC001
aliases: null
name: CLI
subjects:
- CLI
- initial-version
ticket_status: '[[Complete]]'
ticket_priority: high
ticket_rank:
---
# Open Actions

```tasks
tags include #action 
path includes {{query.file.path}}
not done
```

# Description

Create the initial version of the OPMC CLI tool. The CLI should provide commands for working with the OPMC model (Org-Product-Module-Component), including scaffolding new modules and components within a product.

## OPMC Coordinates

- **Org:** polycloud
- **Product:** opmc
- **Module:** cli
- **Component:** main

The CLI source lives under `polycloud-opmc-cli-main/` at the project root.

## Implementation

- **Language:** TypeScript
- **Packaging:** npm package published to the private Forgejo package registry
- **Package name:** `@polycloudinc/polycloud-opmc-cli-main`
- **Execution:** via `npx`

## Commands

### `org set`

Sets the organization identity by creating an `org.yaml` file in the target directory.

```
org set --symbol <symbol> --name <name>
```

| Option | Description |
|--------|-------------|
| `--symbol` | Short identifier for the organization (optional if `--name` provided) |
| `--name`   | Human-readable name for the organization (optional if `--symbol` provided) |

At least one of `--symbol` or `--name` must be supplied. When updating an existing `org.yaml`, only the provided keys are overwritten; the omitted key retains its current value.

Creates or updates `org.yaml`:

```yaml
symbol: <symbol>
name: <name>
```

#### Discovery Behavior

1. Check the current directory for an existing `org.yaml`.
2. If not found, walk up ancestor directories until reaching the filesystem root or an unreadable path.
3. If an `org.yaml` is found in any ancestor, update it in place.
4. If no `org.yaml` is found anywhere in the ancestry, create a new one in the directory where the command was invoked.

### `product set`

Sets the product identity by creating or updating a `product.yaml` file.

```
product set --symbol <symbol> --name <name>
```

| Option | Description |
|--------|-------------|
| `--symbol` | Short identifier for the product (optional if `--name` provided) |
| `--name`   | Human-readable name for the product (optional if `--symbol` provided) |

At least one of `--symbol` or `--name` must be supplied. When updating an existing `product.yaml`, only the provided keys are overwritten; the omitted key retains its current value.

Creates or updates `product.yaml`:

```yaml
symbol: <symbol>
name: <name>
```

#### Discovery Behavior

1. Check the current directory for an existing `product.yaml`.
2. If not found, walk up ancestor directories. The `org.yaml` directory is the upper bound — do not search above it.
3. If a `product.yaml` is found in any ancestor (up to and including the `org.yaml` directory), update it in place.
4. If no `product.yaml` is found by the time we reach the `org.yaml` directory (or if no `org.yaml` exists), create a new `product.yaml` in the directory where the command was invoked.
   - If no `org.yaml` was found in the ancestry, log a warning via `console.warn` and continue.

### `module set`

Sets the module identity by creating or updating a `module.yaml` file.

```
module set --symbol <symbol> --name <name>
```

| Option | Description |
|--------|-------------|
| `--symbol` | Short identifier for the module (optional if `--name` provided) |
| `--name`   | Human-readable name for the module (optional if `--symbol` provided) |

At least one of `--symbol` or `--name` must be supplied. When updating an existing `module.yaml`, only the provided keys are overwritten; the omitted key retains its current value.

Creates or updates `module.yaml`:

```yaml
symbol: <symbol>
name: <name>
```

#### Discovery Behavior

1. Check the current directory for an existing `module.yaml`.
2. If not found, walk up ancestor directories. The `product.yaml` directory is the upper bound — do not search above it.
3. If a `module.yaml` is found in any ancestor (up to and including the `product.yaml` directory), update it in place.
4. If no `module.yaml` is found by the time we reach the `product.yaml` directory (or if no `product.yaml` exists), create a new `module.yaml` in the directory where the command was invoked.
   - If no `product.yaml` was found in the ancestry, log a warning via `console.warn` and continue.

### `component set`

Sets the component identity by creating or updating a `component.yaml` file.

```
component set --symbol <symbol> --name <name>
```

| Option | Description |
|--------|-------------|
| `--symbol` | Short identifier for the component (optional if `--name` provided) |
| `--name`   | Human-readable name for the component (optional if `--symbol` provided) |

At least one of `--symbol` or `--name` must be supplied. When updating an existing `component.yaml`, only the provided keys are overwritten; the omitted key retains its current value.

Creates or updates `component.yaml`:

```yaml
symbol: <symbol>
name: <name>
```

#### Discovery Behavior

1. Check the current directory for an existing `component.yaml`.
2. If not found, walk up ancestor directories. The `module.yaml` directory is the upper bound — do not search above it.
3. If a `component.yaml` is found in any ancestor (up to and including the `module.yaml` directory), update it in place.
4. If no `component.yaml` is found by the time we reach the `module.yaml` directory (or if no `module.yaml` exists), create a new `component.yaml` in the directory where the command was invoked.
   - If no `module.yaml` was found in the ancestry, log a warning via `console.warn` and continue.

### `component qname`

Emits the fully qualified name of the component in scope to stdout.

```
component qname --style dashed
component qname --style dotted
```

| Option | Description |
|--------|-------------|
| `--style` | Output style. One of `dashed` or `dotted`. |

#### Discovery Behavior

The command locates all four OPMC identity files by walking up the directory tree from the current working directory:

1. **Find `component.yaml`:** walk up until `component.yaml` is found. If a `module.yaml` is encountered first, log an error — no component is defined in the scope of this module.
2. **Find `module.yaml`:** starting from the `component.yaml` directory, walk up until `module.yaml` is found. If a `product.yaml` is encountered first, log an error — no module is defined in the scope of this product.
3. **Find `product.yaml`:** starting from the `module.yaml` directory, walk up until `product.yaml` is found. If an `org.yaml` is encountered first, log an error — no product is defined in the scope of this org.
4. **Find `org.yaml`:** starting from the `product.yaml` directory, walk up until `org.yaml` is found.

Once all four files are found, the `symbol` values are read from each and concatenated. The separator is determined by `--style`:

| Style | Output |
|-------|--------|
| `dashed` | `<orgSymbol>-<productSymbol>-<moduleSymbol>-<componentSymbol>` |
| `dotted` | `<orgSymbol>.<productSymbol>.<moduleSymbol>.<componentSymbol>` |

This string is emitted to stdout.

### `module qname`

Emits the fully qualified name of the module in scope to stdout.

```
module qname --style dashed
module qname --style dotted
```

| Option | Description |
|--------|-------------|
| `--style` | Output style. One of `dashed` or `dotted`. |

#### Discovery Behavior

The command locates the module and its ancestors by walking up the directory tree from the current working directory:

1. **Find `module.yaml`:** walk up until `module.yaml` is found. If a `product.yaml` is encountered first, log an error — no module is defined in the scope of this product.
2. **Find `product.yaml`:** starting from the `module.yaml` directory, walk up until `product.yaml` is found. If an `org.yaml` is encountered first, log an error — no product is defined in the scope of this org.
3. **Find `org.yaml`:** starting from the `product.yaml` directory, walk up until `org.yaml` is found.

Once all three files are found, the `symbol` values are read from each and concatenated. The separator is determined by `--style`:

| Style | Output |
|-------|--------|
| `dashed` | `<orgSymbol>-<productSymbol>-<moduleSymbol>` |
| `dotted` | `<orgSymbol>.<productSymbol>.<moduleSymbol>` |

This string is emitted to stdout.

### `product qname`

Emits the fully qualified name of the product in scope to stdout. There is no `org qname` subcommand since the org is a single level.

```
product qname --style dashed
product qname --style dotted
```

| Option | Description |
|--------|-------------|
| `--style` | Output style. One of `dashed` or `dotted`. |

#### Discovery Behavior

The command locates the product and org by walking up the directory tree from the current working directory:

1. **Find `product.yaml`:** walk up until `product.yaml` is found. If an `org.yaml` is encountered first, log an error — no product is defined in the scope of this org.
2. **Find `org.yaml`:** starting from the `product.yaml` directory, walk up until `org.yaml` is found.

Once both files are found, the `symbol` values are read from each and concatenated. The separator is determined by `--style`:

| Style | Output |
|-------|--------|
| `dashed` | `<orgSymbol>-<productSymbol>` |
| `dotted` | `<orgSymbol>.<productSymbol>` |

This string is emitted to stdout.

# Execution Plan

- [ ] Scaffold `polycloud-opmc-cli-main/` with TypeScript project structure (package.json, tsconfig.json, etc.)
- [ ] Implement CLI entry point with subcommand routing
- [ ] Implement `org set` subcommand with `--symbol` and `--name` options
- [ ] Implement `org.yaml` discovery logic (walk up ancestors, update or create)
- [ ] Configure npm package metadata (`@polycloudinc/polycloud-opmc-cli-main`)
- [ ] Configure `bin` entry for `npx` execution
- [ ] Test `org set` command in various scenarios (no file, existing file, ancestor file)
- [ ] Implement `product set` subcommand with `--symbol` and `--name` options
- [ ] Implement `product.yaml` discovery logic (bounded by `org.yaml`; fallback to cwd)
- [ ] Test `product set` command in various scenarios
- [ ] Implement `module set` subcommand with `--symbol` and `--name` options
- [ ] Implement `module.yaml` discovery logic (bounded by `product.yaml`; fallback to cwd)
- [ ] Test `module set` command in various scenarios
- [ ] Implement `component set` subcommand with `--symbol` and `--name` options
- [ ] Implement `component.yaml` discovery logic (bounded by `module.yaml`; fallback to cwd)
- [ ] Test `component set` command in various scenarios
- [ ] Implement `component qname` subcommand with `--style dashed`
- [ ] Implement OPMC file resolution (component → module → product → org) for qname
- [ ] Test `component qname` in various scenarios (fully qualified, missing module, missing product)
- [ ] Implement `module qname` subcommand with `--style dashed`
- [ ] Implement OPMC file resolution (module → product → org) for module qname
- [ ] Test `module qname` in various scenarios (fully qualified, missing product, missing org)
- [ ] Implement `product qname` subcommand with `--style dashed`
- [ ] Implement OPMC file resolution (product → org) for product qname
- [ ] Test `product qname` in various scenarios (fully qualified, missing org)
