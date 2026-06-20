---
description: OPMC module documentation guidelines — rules for creating and maintaining module-level documentation
applyTo: "**/doc/module/**"
---

# Module Documentation

Module documentation describes the internal responsibilities, components, and architecture of an OPMC module. It is the most granular documentation level and lives alongside the module's source code.

- Place module documentation under `doc/module/` in the directory containing `module.yaml`.
- Module documentation must include:
  - **Module Responsibility** — a single sentence describing what this module owns and is accountable for
  - **Component Inventory** — a list of all components within the module, each with its qualified name and a one-line description
  - **Internal Architecture** — how components within the module interact: data structures, call patterns, shared state
  - **Dependencies** — which other modules this module depends on, and what contracts it relies on from each
  - **Component API Contracts** — for each component that exposes an interface: signatures, preconditions, postconditions, error modes
- When a component is added, removed, or its responsibility changes, update the component inventory and architecture sections.
- When a dependency changes (new or removed external module dependency), update the dependencies section.
- Document design decisions in a `## Design Decisions` section. Each entry records what was decided, why, and what alternatives were considered. This prevents re-litigation and helps agents understand the module's evolution.
- Prefer living documentation over stale specs. Update module docs in the same PR that changes behavior — never defer documentation to a follow-up ticket.
