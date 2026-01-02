# Implementation Plan - zo-ui Scaffold Generator

This plan covers the implementation of the `zo-ui run` scaffold generator, which creates framework-specific UI components (Svelte 5, React) from Zod schemas.

## User Review Required

> [!IMPORTANT]
> **ShadCN Integration Strategy**: We are strictly separating `shadcn-svelte` (Bits UI) and `shadcn/ui` (Radix UI).
> - **Svelte 5**: Will use native Runes syntax and `bits-ui` imports.
> - **React**: Will use standard Hooks and `radix-ui` primitives.
> **Validation**: Client-side validation relies on HTML5 attributes by default (no complex JS).

## Proposed Changes

### Core (New Package)

#### [NEW] [packages/zo-ui-core](file:///c:/Users/reidl/GitLocal/zo-ui/packages/zo-ui-core)
- **Schema Parser**: Logic to load `schema.ts` (using `swc` or dynamic import) and traverse Zod definitions.
- **Adapter Interface**: Types for `Adapter`, `FieldInfo`, and generation options.
- **Configuration**: Logic to resolve `zo.config.json` and merging with CLI flags.

### Adapters

#### [NEW] [packages/zo-ui-adapter-shadcn](file:///c:/Users/reidl/GitLocal/zo-ui/packages/zo-ui-adapter-shadcn)
- **Svelte Implementation**: Generators for `Input`, `Select`, `Card`, etc., using Svelte 5 syntax.
- **React Implementation**: Generators using React/Radix patterns.
- **Mapping Logic**: Parsing `.describe()` metadata to select correct components.

#### [NEW] [packages/zo-ui-adapter-tailwind](file:///c:/Users/reidl/GitLocal/zo-ui/packages/zo-ui-adapter-tailwind)
- Native HTML generator with utility classes.

### CLI

#### [NEW] [packages/zo-ui-cli](file:///c:/Users/reidl/GitLocal/zo-ui/packages/zo-ui-cli)
- **Commands**: 
    - `generate`: Main entry point.
    - `validate`: Validation logic.
- **Integration**: Glue code for `yargs`/`commander` to invoke Core and Adapters.

### Infra

#### [MODIFY] [.pre-commit-config.yaml](file:///c:/Users/reidl/GitLocal/zo-ui/.pre-commit-config.yaml)
- Add entries for linting/testing the new packages.

#### [MODIFY] [.github/workflows/ci.yml](file:///c:/Users/reidl/GitLocal/zo-ui/.github/workflows/ci.yml)
- Update CI to build and test the new `zo-ui` packages.

## Verification Plan

### Automated Tests
- **Unit Tests**:
    - `vitest` for Schema Parser (verifying Zod traversal).
    - `vitest` for Adapter output (snapshot testing generated code).
- **Integration Tests**:
    - Run `zo-ui generate` against a reference `schema.ts` and verify file creation.

### Manual Verification
- **Svelte 5**: Import generated component into a mock SvelteKit 5 app and verify rendering/interactivity.
- **React**: Import generated component into a Next.js app.
- **CLI**: Verify `--help` and configuration precedence (CLI vs Config vs Env).
