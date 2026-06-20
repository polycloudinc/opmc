---
description: OPMC product documentation guidelines — rules for creating and maintaining product-level documentation
applyTo: "**/doc/product/**"
---

# Product Documentation

Product documentation describes the capabilities, architecture, and module composition of an OPMC product. It sits between the vision document (why) and module documentation (how).

- Place product documentation under `doc/product/` in the directory containing `product.yaml`.
- Product documentation must include:
  - **Product Overview** — what the product does and its primary capabilities
  - **Module Inventory** — a list of all modules that compose the product, each referenced by its qualified name
  - **Architecture** — how modules interact: data flow, communication patterns, shared infrastructure
  - **Public API Surface** — the interfaces exposed to consumers outside the product (APIs, SDKs, CLIs, events)
  - **Cross-Cutting Concerns** — logging, authentication, error handling, and other concerns shared across modules
- When a new module is added to the product, update the module inventory and architecture sections.
- When a module's public contract changes and that contract is part of the product's API surface, update the public API surface section.
- Do not duplicate module-level detail — reference the module's own documentation under its `doc/module/` directory.
- Keep a changelog section (`## Changelog`) at the bottom recording significant changes with dates. This helps consumers understand when and why the documentation was updated.
