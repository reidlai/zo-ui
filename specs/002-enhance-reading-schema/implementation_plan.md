# Implementation Plan: Enhance Reading Schema with UI Mapping

**Branch**: `002-enhance-reading-schema` | **Date**: 2026-01-02 | **Spec**: [specs/002-enhance-reading-schema/spec.md](file:///c:/Users/reidl/GitLocal/zo-ui/specs/002-enhance-reading-schema/spec.md)
**Input**: Feature specification from `specs/002-enhance-reading-schema/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

The `zo-ui` CLI will be enhanced to support an extensible "Adapter" architecture for generating UI components from Zod schemas. Use a new core `SchemaResolver` to traverse schemas, apply `zo.config.json` overrides, and pass a resolved `UITree` to pluggable adapters (internal or external). A standalone types package (`@zo-ui/core-types`) will be published to support custom adapter development. Explicit documentation generation and atomic write safety are key requirements.

## Technical Context

**Language/Version**: Node.js v20+, TypeScript 5+
**Primary Dependencies**: Zod (Runtime), Commander (CLI), Chalk/Consola (Logging).
**New Dependencies**: `ts-morph` (potential for robust code gen, or just strings?), `zod-to-json-schema` (maybe? or custom traversal?). *Logic for traversal needs decision.*
**Storage**: N/A (CLI tool, writes to file system).
**Testing**: Vitest (Unit), Manual E2E (Repl).
**Target Platform**: CLI (Windows/Linux/macOS).
**Project Type**: Monorepo packages.
**Performance Goals**: < 500ms for generation of typical schema.
**Constraints**: Zero runtime dependency of generated code on `zo-ui` core.
**Scale/Scope**: Supports nesting 5+ levels deep.

### Key Technical Decisions (Resolved)
1.  **Standalone Types Package**: `packages/zo-ui-types`.
    *   *Rationale*: clean separation, publishable.
2.  **Adapter Loading**: Dynamic `import()` with `file://` prefix handling for Windows absolute paths.
    *   *Rationale*: Supports both ESM and CJS formats in modern Node.
3.  **Traversal**: Custom Recursive Visitor.
    *   *Rationale*: `zod-to-json-schema` lacks fine-grained control over custom metadata extraction (`.describe('ui:...')`) and `UITree` construction constraints.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

1. **Tech Stack**: TypeScript/Node.js matches Authorized Tech Stack.
2. **Dependencies**: All new dependencies (if any) must be permissive (MIT/Apache).
3. **Testing**: Unit tests required. Integration tests defined in Spec (User Stories).
4. **Architecture**: Moonrepo governance. New package will need `moon.yml`.

**Status**: **PASSING** (Pending specific package location decision).

## Project Structure

### Documentation (this feature)

```text
specs/002-enhance-reading-schema/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (Plugin Interface)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
packages/
├── zo-ui/               # Core CLI
│   ├── src/
│   │   ├── core/
│   │   │   └── resolver/ # [NEW] Schema Resolver Engine
│   │   ├── commands/
│   │   │   ├── generate.ts
│   │   │   └── docs.ts   # [NEW] Specs FR-005
│   │   └── adapters/     # [NEW] Internal Adapter Registry
├── core-types/          # [NEW] (Location TBD) Standalone types
│   ├── package.json
│   └── src/index.ts
└── adapter-svelte/      # [NEW] Internal Default Adapter
    └── src/
```

**Structure Decision**: Monorepo split. Core Logic in `zo-ui`, Definitions in `core-types` (published), Default Adapter in `adapter-svelte` (bundled or internal).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| N/A       |            |                                      |
