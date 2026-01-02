# Tasks: zo-ui Scaffold Generator

## Dependencies

- Phase 2 (Core) depends on Phase 1 (Setup)
- Phase 3 (Adapters) depends on Phase 2 (Core)
- Phase 4 (CLI) depends on Phase 2 & 3
- Phase 5 (Docs) depends on Phase 4

## Phase 1: Setup

Shared infrastructure and project initialization.

- [ ] T001 Initialize package `zo-ui-core` in `packages/zo-ui-core`
- [ ] T002 Initialize package `zo-ui-adapter-shadcn` in `packages/zo-ui-adapter-shadcn`
- [ ] T003 Initialize package `zo-ui-adapter-tailwind` in `packages/zo-ui-adapter-tailwind`
- [ ] T004 Initialize package `zo-ui-cli` in `packages/zo-ui-cli`
- [ ] T005 Update CI/CD `ci.yml` to include new packages
- [ ] T006 Update `.pre-commit-config.yaml` with linting rules for new packages

## Phase 2: Core Logic

Implementation of schema parsing and configuration.

- [ ] T007 [US1] Implement `SchemaParser` using `jiti` and `zod-to-json-schema` in `packages/zo-ui-core/src/parser.ts`
- [ ] T008 [US1] Implement `SchemaLoader` to scan/select exports in `packages/zo-ui-core/src/loader.ts`
- [ ] T009 [US1] Define `Adapter` and `GeneratorOptions` interfaces in `packages/zo-ui-core/src/types.ts`
- [ ] T010 [P] [US1] Implement config resolver (`zo.config.json` + Env + CLI merge) in `packages/zo-ui-core/src/config.ts`
- [ ] T011 [US1] Add unit tests for SchemaParser in `packages/zo-ui-core/src/__tests__/parser.test.ts`

## Phase 3: Adapters

Implementation of UI generation logic.

### ShadCN Adapter (P1 - Svelte First)
- [ ] T012 [US2] Implement `ShadcnSvelteAdapter` setup in `packages/zo-ui-adapter-shadcn/src/svelte.ts`
- [ ] T013 [P] [US2] Implement Input/Textarea generators (Runes syntax) in `packages/zo-ui-adapter-shadcn/src/generators/svelte/input.ts`
- [ ] T014 [P] [US2] Implement Select/Radio generators (Runes syntax) in `packages/zo-ui-adapter-shadcn/src/generators/svelte/select.ts`
- [ ] T015 [US2] Implement Form Logic (Superforms) wrapper in `packages/zo-ui-adapter-shadcn/src/generators/svelte/form.ts`
- [ ] T016 [US2] Implement imports resolver (reading `components.json`) in `packages/zo-ui-adapter-shadcn/src/resolver.ts`

### Tailwind Adapter (P2)
- [ ] T017 [P] [US2] Implement `TailwindAdapter` native HTML generator in `packages/zo-ui-adapter-tailwind/src/index.ts`

### React Adapter (P2 - Deferred)
- [ ] T018 [P] [US2] Implement `ShadcnReactAdapter` stub/basic implementation in `packages/zo-ui-adapter-shadcn/src/react.ts`

## Phase 4: CLI & Validation

User interface and commands.

- [ ] T019 [US3] Setup `commander` entry point in `packages/zo-ui-cli/src/index.ts`
- [ ] T020 [US3] Implement `generate` command with all flags in `packages/zo-ui-cli/src/commands/generate.ts`
- [ ] T021 [US3] Implement interactive prompts (overwrite, schema select) using `inquirer`/`prompts` in `packages/zo-ui-cli/src/prompts.ts`
- [ ] T022 [US3] Implement `validate` command (single file & batch mode) in `packages/zo-ui-cli/src/commands/validate.ts`
- [ ] T023 [P] [US3] Implement structured logging (Info/Debug/JSON) in `packages/zo-ui-cli/src/logger.ts`

## Phase 5: Documentation & Polish

- [ ] T024 Generate comprehensive `README.md` with flag reference and examples
- [ ] T025 Verify `--help` output covers all options (FR-020)
- [ ] T026 Create `quickstart.md` guide (if not already present in docs)
