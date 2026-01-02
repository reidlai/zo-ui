# Implementation Tasks: Enhance Reading Schema with UI Mapping

**Feature**: `002-enhance-reading-schema`
**Branch**: `002-enhance-reading-schema`
**Spec**: [specs/002-enhance-reading-schema/spec.md](file:///c:/Users/reidl/GitLocal/zo-ui/specs/002-enhance-reading-schema/spec.md)

## Phase 1: Setup & Infrastructure

- [x] T001 Create `packages/zo-ui-types` package structure `package.json`
- [x] T002 Update `packages/zo-ui/package.json` dependencies (add `ts-morph` or equivalent traversal utils)
- [x] T003 Create `packages/zo-ui/src/core/resolver` directory structure
- [x] T004 Create `packages/zo-ui/src/core/plugin` directory structure

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T005 Define `UINode`, `ComponentNode`, `ContainerNode` interfaces in `packages/zo-ui-types/src/index.ts`
- [x] T006 Define `AdapterPlugin` and `GeneratedFile` interfaces in `packages/zo-ui-types/src/index.ts`
- [x] T007 Build and link `packages/zo-ui-types` workspace package
- [x] T008 Implement `SchemaResolver` shell and `DefaultMapping` registry in `packages/zo-ui/src/core/resolver/DefaultMapping.ts`

## Phase 3: User Story 1 - Default Component Mapping (P1)

**Goal**: Automatically generate standard UI components from Zod types.

- [x] T009 [US1] Implement Zod Recursive Visitor in `packages/zo-ui/src/core/resolver/Visitor.ts`
- [x] T010 [US1] Implement `SchemaResolver.resolve(schema)` to produce `UITree` in `packages/zo-ui/src/core/resolver/SchemaResolver.ts`
- [x] T011 [US1] Update `packages/zo-ui-adapter-shadcn` to implement `AdapterPlugin` interface
- [x] T012 [US1] Implement `generate(tree)` in `packages/zo-ui-adapter-shadcn/src/index.ts` for basic types (String, Number, Boolean)
- [x] T013 [US1] Implement Atomic Write logic (FR-014) in `packages/zo-ui/src/utils/FileWriter.ts`
- [x] T014 [US1] Update `packages/zo-ui/src/commands/generate.ts` to use `SchemaResolver` and Default Adapter
- [x] T015 [US1] Logic to fallback to `zo-ui-adapter-shadcn` if no config found (FR-006)

## Phase 4: User Story 2 - Explicit Component Override (P1)

**Goal**: Support configuration via `zo.config.json` and Zod metadata.

- [x] T016 [US2] Implement `ConfigLoader` to read `zo.config.json` in `packages/zo-ui/src/core/config/ConfigLoader.ts`
- [x] T017 [US2] Implement Dynamic Plugin Loader (ESM/CJS support) in `packages/zo-ui/src/core/plugin/PluginLoader.ts`
- [x] T018 [US2] Update `SchemaResolver` to apply Config Overrides (FR-002) in `packages/zo-ui/src/core/resolver/SchemaResolver.ts`
- [x] T019 [US2] Update `SchemaResolver` to parse `.describe("ui:...")` metadata (FR-003) in `packages/zo-ui/src/core/resolver/Visitor.ts`
- [x] T020 [US2] [P] Implement specialized component mapping (Textarea, DatePicker) in `packages/zo-ui-adapter-shadcn/src/index.ts`

## Phase 5: User Story 3 - Component Reference Documentation (P2)

**Goal**: Generate documentation for available components.

- [x] T021 [US3] Implement `getComponentList()` in `packages/zo-ui-adapter-shadcn/src/index.ts`
- [x] T022 [US3] Create `packages/zo-ui/src/commands/docs.ts` command
- [x] T023 [US3] Implement logic to render Markdown table of components in `packages/zo-ui/src/commands/docs.ts`

## Final Phase: Polish & Cross-Cutting

- [x] T024 Create `docs/custom-adapter-guide.md` documentation (FR-009)
- [x] T025 Verify `npx zo-ui generate` functionality in a fresh directory (FR-006 Warning)

## Dependencies

- **US1** depends on Phase 2 (Foundational).
- **US2** extends US1 (Resolver enhancements).
- **US3** depends on Adapter Interface (Phase 2).

## Implementation Strategy
Start by isolating the Types (Phase 1/2) to unblock parallel work on the Adapter and the Resolver. Simple primitives first, then add the Config/Metadata layers.
