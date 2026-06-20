---
description: OPMC vision documentation guidelines — rules for creating and maintaining the vision document at the org or product level
applyTo: "**/doc/vision/**"
---

# Vision Documentation

The vision document is the highest-level documentation artifact in an OPMC project. It defines the long-term purpose and direction of the org or product, and all other documentation derives from it.

- Place the vision document at the org or product root under `doc/vision/`. For org-level vision, use `org.yaml`'s directory. For product-level vision, use `product.yaml`'s directory.
- Keep the vision document concise — one to two pages. It is not a spec, not a roadmap, and not a user guide.
- Include these core sections:
  - **Purpose** — why this org or product exists, the problem it solves
  - **Target Audience** — who the software serves (end users, developers, operators)
  - **Goals** — measurable, time-bound outcomes the org or product aims to achieve
  - **Scope** — what is in scope and, critically, what is out of scope
  - **Context** — how this org or product fits into the broader ecosystem
- Refer to downstream OPMC levels by their qualified names (`org-product-module`). Do not describe modules or components in detail here — defer to product and module documentation.
- Review the vision document when org or product scope changes. Stale vision documents mislead contributors and agents.
- File naming: use `vision.md` or, for multi-file visions, `vision/overview.md` with supporting documents under `vision/`.
