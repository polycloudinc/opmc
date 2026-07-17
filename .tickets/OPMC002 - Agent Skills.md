---
template: '[[Ticket]]'
kind: ticket
tags:
- ticket
code: OPMC002
aliases: null
name: Agent Skills
subjects:
- agent
- skills
ticket_status: '[[Complete]]'
ticket_priority: medium
ticket_rank:
---
# Open Actions

```tasks
tags include #action 
path includes {{query.file.path}}
not done
```

# Description

Expose the OPMC CLI functionality as a set of agent skills that can be invoked by AI coding assistants. Each skill wraps a CLI command, allowing agents to discover and manipulate OPMC identity files without needing to invoke the CLI directly.

## Skills

- **opmc-org-set** — wraps `org set` to create or update `org.yaml`
- **opmc-product-set** — wraps `product set` to create or update `product.yaml`
- **opmc-module-set** — wraps `module set` to create or update `module.yaml`
- **opmc-component-set** — wraps `component set` to create or update `component.yaml`
- **opmc-component-qualified-name** — resolves the component qualified name via `component qname`
- **opmc-module-qualified-name** — resolves the module qualified name via `module qname`
- **opmc-product-qualified-name** — resolves the product qualified name via `product qname`

## Decisions

- **Distribution:** APM (Agent Package Manager) will be used to distribute the skills.
- **Source module:** The skills source code lives in a new OPMC module `polycloud-opmc-skills-main/` at the project root. OPMC coordinates: org=`polycloud`, product=`opmc`, module=`skills`, component=`main`.
- **Manifest and source layout:** APM requires `apm.yml` and `.apm/` to be siblings. Both must live together — either at the repo root (consumer ref: `aleisium/als_sys_app_opmc`) or inside `polycloud-opmc-skills-main/` (consumer ref: `aleisium/als_sys_app_opmc/polycloud-opmc-skills-main`). Final placement TBD based on preferred consumer reference.
- **Publishing:** A Forgejo Actions workflow will publish the APM package by tagging the repository with a version tag. APM resolves packages from Git tags — no package registry upload is required. The tag format is `v{MAJOR}.{MINOR}.{REVISION}` derived from the root `version` file and commit count. No tag collision with the CLI workflow (CLI publishes to npm registry directly without tags).
- **Prerequisite handling:** Skills invoke the CLI via `npx @polycloudinc/opmc`. An instruction primitive will teach agents to verify `npx` availability before executing commands. A `check-prereqs` script in `apm.yml` provides a manual verification path for consumers.
- **Versioning:** Skills package version tracks the root `version` file (same source as CLI): `VERSION_MAJOR.VERSION_MINOR` + git commit count as `VERSION_REVISION`.

## Open Questions

- **Target harnesses:** Which agent runtimes should the skills deploy to? Options: `claude`, `copilot`, `opencode`, `cursor`, `codex`, `gemini`, `windsurf`. Default: auto-detect all.
- **Manifest placement:** Repo root (clean ref) vs inside `polycloud-opmc-skills-main/` (clean module separation with virtual-path ref).

## Execution Plan

- [ ] Scaffold `polycloud-opmc-skills-main/` with `apm.yml` and `.apm/skills/` directory
- [ ] Author `SKILL.md` for each of the seven OPMC commands
- [ ] Add `check-prereqs` script to verify `npx`/`@polycloudinc/opmc` availability
- [ ] Create Forgejo Actions workflow to tag and publish APM package
- [ ] Update `OPMC.md` with APM install instructions for consumers
- [ ] Tag ready for manual testing from a separate consumer repository
