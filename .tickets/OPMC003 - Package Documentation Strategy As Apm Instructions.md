---
template: '[[Ticket]]'
kind: ticket
tags:
- ticket
code: OPMC003
aliases:
- OPMC003
name: Package Documentation Strategy As Apm Instructions
ticket_status: '[[Complete]]'
ticket_priority: Medium
ticket_rank: null
ticket_created: '2026-06-20T10:39:31Z'
ticket_updated: '2026-06-20T11:20:06Z'
ticket_completed: '2026-06-20T11:20:06Z'
---
# Open Actions

```tasks
tags include #action 
path includes {{query.file.path}}
not done
```

# Introduction

Package common OPMC documentation strategy guidelines (vision document, product documentation, module documentation) as APM instructions so they can be distributed to any project via `apm install`. These instructions tell AI agents how to approach documentation at each OPMC level, and need to work alongside any existing AGENTS.md content a consumer project may already have.

# Requirements

- Author three APM instruction files (`.instructions.md` with `applyTo` globs) covering each OPMC doc level:
  - **Vision documentation** — scoped to `**/doc/vision/**` or similar glob
  - **Product documentation** — scoped to `**/doc/product/**` or similar glob
  - **Module documentation** — scoped to `**/doc/module/**` or similar glob
- Package instructions under `.apm/instructions/` within the project's APM source tree
- Compile and deploy correctly to all relevant agent harness targets (opencode, copilot, claude, cursor, windsurf, codex, gemini, kiro)
- Coexist with pre-existing AGENTS.md content in consumer projects via managed-section mode (`compilation.agents_md.mode: managed_section`)
- Support versioned updates — consumers must be able to check for (`apm outdated`) and apply (`apm update`) newer versions of the instructions
- Content hash verification must catch any supply-chain drift on reinstall

# Technical Solution

**Primitive type:** APM instructions (`.instructions.md`) — these are always-on rules scoped to file patterns via `applyTo` frontmatter. They compile to per-harness formats (`.claude/rules/`, `.cursor/rules/`, etc.) for targets that support per-file rules, and are folded into the root context file (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`) for targets that do not.

**File layout:**

```
.apm/instructions/
  opmc-vision-documentation.instructions.md
  opmc-product-documentation.instructions.md
  opmc-module-documentation.instructions.md
```

Each file uses YAML frontmatter with `description` + `applyTo`, followed by bulleted rules (one topic per file, no prose preamble):

```yaml
---
description: Rules for OPMC vision documents
applyTo: "**/doc/vision/**"
---
- The vision document describes the long-term purpose...
```

**Package location:** Add to the existing `opmc-skills` APM package (alongside existing OPMC identity skills and the `opmc-prerequisites` instruction), since documentation strategy is a natural companion to OPMC identity management.

**AGENTS.md coexistence:** Consumers who maintain their own AGENTS.md content use managed-section mode:

```yaml
# consumer's apm.yml
compilation:
  agents_md:
    mode: managed_section
```

The consumer places `<!-- apm:start -->` and `<!-- apm:end -->` markers in their AGENTS.md. APM only writes between those markers — all hand-authored content outside is preserved across every `apm install` / `apm compile`.

**Version update flow for consumers:**

1. `apm outdated` — read-only check for newer versions
2. `apm update` — re-resolves to latest refs, rewrites lockfile, redeploys primitives
3. `apm install --frozen` — CI gate that fails on lockfile drift
4. `apm audit` — post-install drift detection (unintegrated, modified, orphaned)

# Execution Plan

## Phase 1: Author instruction files

- [x] Determine final `applyTo` globs for each doc level (vision, product, module)
- [x] Author `.apm/instructions/opmc-vision-documentation.instructions.md` — rules for creating and maintaining vision documents at the org/product level
- [x] Author `.apm/instructions/opmc-product-documentation.instructions.md` — rules for product-level documentation
- [x] Author `.apm/instructions/opmc-module-documentation.instructions.md` — rules for module-level documentation
- [x] Each file: YAML frontmatter with `description` + `applyTo`, body in bullets, one topic per file, no prose preamble

## Phase 2: Compile and validate

- [x] Run `apm compile --validate` to check frontmatter and structure
- [x] Run `apm compile --dry-run` to confirm placement decisions across targets
- [x] Run `apm compile` to generate output files (AGENTS.md, CLAUDE.md, GEMINI.md, per-harness rules)
- [x] Inspect generated output — verify instructions appear correctly in AGENTS.md and per-target rules directories
- [x] Verify no regressions: existing `opmc-prerequisites.instructions.md` still compiles alongside new files

## Phase 3: Update consumer documentation

- [x] Update `OPMC.md` with a section explaining how to consume the documentation strategy instructions
- [x] Document managed-section mode setup for consumers with existing AGENTS.md (`compilation.agents_md.mode: managed_section` + markers)
- [x] Document version update flow (`apm outdated` → `apm update` → `apm audit`)

## Phase 4: Test from a consumer project

- [x] Create a scratch project with a pre-existing hand-authored AGENTS.md containing `<!-- apm:start -->` / `<!-- apm:end -->` markers
- [x] `apm install` the opmc-skills package into the scratch project
- [x] Verify AGENTS.md hand-authored content is preserved, only the marked section is updated
- [x] Verify instructions deploy correctly to target harness directories
- [x] Run `apm audit` in the scratch project, confirm no drift reported
