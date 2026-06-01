---
template: "[[Ticket]]"
kind: ticket
tags:
  - ticket
code: OPMC001
aliases:
name: CLI
subjects:
  - CLI
  - initial-version
ticket_status: todo
ticket_priority: high
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

- **Org:** als
- **Product:** opmc
- **Module:** cli
- **Component:** main

The CLI source lives under `als-opmc-cli-main/` at the project root.
