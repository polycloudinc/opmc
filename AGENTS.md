# OPMC CLI

This project builds a CLI and supporting assets for implementing the **OPMC model** (Org-Product-Module-Component), a pattern for structuring modular product code aligned with Domain-Driven Design.

## Key Concepts

- **Organization** — top-level namespace for the org owning the software
- **Product** — logical grouping of modules under a common umbrella
- **Module** — central unit of organization; one repo per module, each containing one or more components
- **Component** — physical unit of software (library, daemon, job, etc.)

Reference: https://brendonmatheson.com/2019/10/18/modular-product-code-with-the-opmc-model.html

## Configuration

Product identity is defined in `product.yaml`:

```yaml
symbol: opmc
name: Org-Product-Module-Component Model
```

## Development

- `npm install` — install dependencies
- CLI and workflow tooling is built on the `@aleisium` source package ecosystem
- Tickets are managed via `tickets.sh` using the `@aleisium/sourcepkg-sdd-tickets` tooling
