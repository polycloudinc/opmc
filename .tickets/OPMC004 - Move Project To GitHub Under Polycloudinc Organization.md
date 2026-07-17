---
template: '[[Ticket]]'
kind: ticket
tags:
- ticket
code: OPMC004
aliases:
- OPMC004
name: Move Project To GitHub Under Polycloudinc Organization
ticket_status: '[[Complete]]'
ticket_priority: Medium
ticket_rank: null
ticket_created: '2026-07-17T12:05:26Z'
ticket_updated: '2026-07-17T12:52:01Z'
ticket_completed: '2026-07-17T12:52:01Z'
---
# Introduction

Migrate the OPMC project repository from the local Forgejo instance (forgejo.aleisium.com) to GitHub under the polycloudinc organization. This covers all source code, CI/CD workflows, package registries, and documentation updates required to complete the move.

# Requirements

- Repository is transferred/mirrored to `github.com/polycloudinc/opmc`
- CI/CD workflows are migrated from Forgejo Actions to GitHub Actions:
  - `publish-opmc.yaml` — build the CLI, version it, and publish to npmjs.org as `@polycloudinc/opmc`
  - `publish-skills.yaml` — tag a release version and push for APM resolution
- Workflow files are relocated from `.forgejo/workflows/` to `.github/workflows/`
- Forgejo-specific syntax (`runs-on: docker`, `container:`) is replaced with GitHub-native equivalents (`runs-on: ubuntu-latest`)
- Package registry configuration switches from Forgejo's npm registry to npmjs.org via trusted publishing (OIDC)
- CI git identity updated from Forgejo CI to GitHub Actions bot
- All remaining Forgejo URL references in source files and documentation are updated to GitHub equivalents
- All remaining `@polycloudinc` scope references and package names carry forward to the new registries
- Existing APM dependencies on the old repo are updated or migration path documented
- Current ticket/issue history is preserved or migrated
- The move does not break the CLI build, APM skills compilation, or local development setup

# Technical Solution

## Workflow Migration

Move both workflows from `.forgejo/workflows/` to `.github/workflows/` and adapt each for GitHub Actions.

### publish-opmc.yaml Changes
- Replace `runs-on: docker` / `container: node:22` with `runs-on: ubuntu-latest`, adding `actions/setup-node@v4` with `node-version: 22` and `registry-url: https://registry.npmjs.org`
- Add `permissions: id-token: write, contents: read` for OIDC token generation
- Remove the Forgejo registry `.npmrc` configuration step — trusted publishing handles auth automatically
- Publish with `npm publish --access public` (first publish for scoped package)
- Path trigger reference changes from `.forgejo/workflows/` to `.github/workflows/`

### publish-skills.yaml Changes
- Same `runs-on` and `container` migration as above, including `actions/setup-node@v4`
- Git identity swap: `ci@forgejo.aleisium.com` → GitHub Actions bot (`github-actions[bot]`)
- Path trigger changes as above
- No registry auth needed — APM resolves from Git tags

## Registry Decision

The CLI package (`@polycloudinc/opmc`) will be published to npmjs.org using trusted publishing (OIDC). No long-lived tokens required. The npmjs.com package settings must be configured with the GitHub Actions trusted publisher (org: `polycloudinc`, repo: `opmc`, workflow: `publish-opmc.yaml`).

## Files Requiring Forgejo-to-GitHub URL Updates

| File | Current Forgejo Reference |
|---|---|
| `OPMC.md` | Registry config, repo URLs, setup instructions |
| `AGENTS.md` | Registry config guidance |
| `.apm/instructions/opmc-prerequisites.instructions.md` | Registry config guidance |
| `.apm/skills/opmc-org-set/SKILL.md` | Registry config |
| `.apm/skills/opmc-product-set/SKILL.md` | Registry config |
| `.apm/skills/opmc-module-set/SKILL.md` | Registry config |
| `.apm/skills/opmc-component-set/SKILL.md` | Registry config |
| `.apm/skills/opmc-component-qualified-name/SKILL.md` | Registry config |
| `.apm/skills/opmc-module-qualified-name/SKILL.md` | Registry config |
| `.apm/skills/opmc-product-qualified-name/SKILL.md` | Registry config |
| `.agents/skills/opmc-org-set/SKILL.md` | Registry config |
| `.agents/skills/opmc-product-set/SKILL.md` | Registry config |
| `.agents/skills/opmc-module-set/SKILL.md` | Registry config |
| `.agents/skills/opmc-component-set/SKILL.md` | Registry config |
| `.agents/skills/opmc-component-qualified-name/SKILL.md` | Registry config |
| `.agents/skills/opmc-module-qualified-name/SKILL.md` | Registry config |
| `.agents/skills/opmc-product-qualified-name/SKILL.md` | Registry config |
| `.agents/skills/modver-forgejo-workflow/SKILL.md` | Forgejo Actions URLs, CI email |
| `polycloud-opmc-cli-main/package.json` | `repository.url` |
| `.tickets/OPMC002 - Agent Skills.md` | Repo ref `aleisium/als_sys_app_opmc` |

The common registry config line in all skill/instruction files is:
```
npm config set @polycloudinc:registry https://registry.npmjs.org/
```
This must become:
```
npm config set @polycloudinc:registry https://registry.npmjs.org/
```

# Execution Plan

### Phase 1: Repository Transfer
- [ ] Push repository to `github.com/polycloudinc/opmc`
- [ ] Verify all branches, tags, and commit history are intact

### Phase 2: Workflow Migration
- [ ] Create `.github/workflows/publish-opmc.yaml`
  - Replace `runs-on: docker` / `container: node:22` with `runs-on: ubuntu-latest`
  - Add `permissions: id-token: write, contents: read` for OIDC
  - Add `actions/setup-node@v4` with `node-version: 22` and `registry-url: https://registry.npmjs.org`
  - Remove Forgejo registry `.npmrc` step — trusted publishing handles auth
  - Publish with `npm publish --access public`
  - Update path trigger from `.forgejo/workflows/` to `.github/workflows/`
  - Preserve version derivation from root `version` file and git rev-list
- [ ] Create `.github/workflows/publish-skills.yaml`
  - Replace `runs-on: docker` / `container: node:22` with `runs-on: ubuntu-latest`
  - Update path trigger from `.forgejo/workflows/` to `.github/workflows/`
  - Swap git identity to `github-actions[bot] <github-actions[bot]@users.noreply.github.com>`
  - Preserve tag derivation from root `version` file and git rev-list
- [ ] Configure trusted publisher on npmjs.com: package settings → GitHub Actions → `polycloudinc` / `opmc` / `publish-opmc.yaml`
- [ ] Push and verify both workflows trigger and pass

### Phase 3: Forgejo-to-GitHub URL Updates
- [ ] Update `OPMC.md`
  - Registry config: `@polycloudinc:registry` → `https://registry.npmjs.org/`
  - APM install command: `forgejo.aleisium.com:222/aleisium/als_sys_app_opmc.git` → `github.com/polycloudinc/opmc.git`
  - npx fallback registry: `--registry=https://forgejo.aleisium.com/...` → `--registry=https://registry.npmjs.org/`
- [ ] Update `AGENTS.md` — registry config to npmjs.org
- [ ] Update `.apm/instructions/opmc-prerequisites.instructions.md` — registry config to npmjs.org
- [ ] Update all 7 `.apm/skills/opmc-*/SKILL.md` files — registry config to npmjs.org
- [ ] Update all 7 `.agents/skills/opmc-*/SKILL.md` files — registry config to npmjs.org
- [ ] Update `.agents/skills/modver-forgejo-workflow/SKILL.md` — Forgejo Actions URLs and CI email to GitHub equivalents
- [ ] Update `polycloud-opmc-cli-main/package.json` — `repository.url` to `github.com/polycloudinc/opmc`
- [ ] Update `.tickets/OPMC002` — replace `aleisium/als_sys_app_opmc` with `polycloudinc/opmc`
- [ ] Verify `apm.yml` check-prereqs script — no Forgejo references remain

### Phase 4: Cleanup
- [ ] Remove `.forgejo/` directory
- [ ] Verify no remaining Forgejo URL references exist in source files
- [ ] Test full end-to-end: push to GitHub → both workflows trigger → `@polycloudinc/opmc` resolvable via `npx` 