# Feature Specification: zo-ui Scaffold Generator

**Feature Branch**: `feature/zo-ui-scaffold-generator`
**Created**: 2026-01-02
**Status**: Draft
**Input**: User description provided in prompt.

## Clarifications

### Session 2026-01-02
- Q: How should the CLI handle multiple frameworks and UI kits? → A: Use `--ui-framework` (accepting `svelte`, `nextjs`, `react`) and `--ui-kit` (accepting `daisyui`, `shadcn`, etc) flags.
- Q: Implementation priority for frameworks? → A: Svelte First (with ShadCN & DaisyUI). React/Next.js support is secondary/deferred.
- Q: How to map schema fields to specific UI components (e.g. Radio vs Select)? → A: Use Zod's `.describe()` metadata (e.g., `.describe('{"component": "radio"}')`). Fallback to safe defaults.
- Q: Should generated components include handling logic (e.g. Superforms)? → A: Hybrid. Default to static UI. Support `--form-lib` flag (e.g. `superforms` for Svelte) to add boilerplate. Note: React/Next.js logic support is deferred.
- Q: How to resolve component import paths (e.g. where is `Card`)? → A: Read `components.json` (ShadCN standard) or `zo.config.json` to detect paths. Fallback to CLI args or standard defaults.
- Q: Client-side validation strategy? → A: Use standard HTML5 attributes (`required`, `min`, `max`) mapped from Zod rules. No complex JS validation by default.
- Q: Support for plain Tailwind CSS (no UI kit)? → A: Yes, support `--ui-kit tailwind` to generate plain HTML with standard Tailwind utility classes.
- Q: How does Shadcn support differ between Svelte and React? → A: Svelte uses `shadcn-svelte` (Bits UI, Runes). React uses `shadcn/ui` (Radix UI, Hooks). The generator MUST output framework-specific implementations.
- Q: Required CI/CD updates? → A: .pre-commit-config.yaml and .github/workflows/ci.yml MUST be updated to support the generator's stack (TypeScript, Svelte 5, Zod).
- Q: Strategy for nested schema objects? → A: Single file. Flatten/group nested objects efficiently within the main component (e.g. using Fieldsets) rather than generating multiple files.
- Q: Behavior when output file exists? → A: Interactive Prompt ("Overwrite? Y/n") by default. Support `--force` flag to skip validation.
- Q: How to handle files with multiple exported schemas? → A: Add `--type <Name>` (or `--schema`) flag to specify the target export. If omitted, prompt interactively.
- Q: Purpose of `validate` subcommand? → A: Verify that a `schema.ts` file compiles, exports a valid Zod schema, and adheres to generator constraints.
- Q: Scope of `validate` command? → A: Support specific file validation via `--schema` AND project-wide scan via `--all`.
- Q: Output format for `validate`? → A: Human-readable text by default. Support `--json` flag for machine-parsable output (CI/CD).
- Q: Documentation requirements? → A: Comprehensive `--help` for all commands/flags. Robust `README.md` covering capabilities, param reference, and `npx` usage.
- Q: Configuration precedence and sources? → A: 3-tier layer: CLI Flags (Highest) > Environment Variables > Config File (Lowest).
- Q: Logging strategy? → A: Standard levels (Error, Warn, Info, Debug). Controlled via `--log-level` (default: info) or `--verbose`.

## User Scenarios & Testing

### User Story 1 - Generate Component from Schema (Priority: P1)

As a developer, I want to generate a UI component (e.g., Svelte) directly from my Zod schema so that I don't have to manually write boilerplate code for forms or displays.

**Why this priority**: This is the core value proposition of the tool.

**Independent Test**: Can be tested by running the CLI command against a sample Zod schema and verifying a file is created with expected content.

**Acceptance Scenarios**:

1. **Given** a valid `schema.ts` file exporting a Zod schema, **When** I run `zoo generate --schema ./schema.ts --output ./Widget.svelte`, **Then** a new file `Widget.svelte` is created containing the UI code representing the schema fields.
2. **Given** a schema with nested objects, **When** I run the generator, **Then** the output flattens or handles the structure appropriately.

---

### User Story 2 - Multiple UI Adapter Support (Priority: P2)

As a developer, I want to specify which UI Framework (Svelte, Next.js, React) and UI Kit (Shadcn, DaisyUI) to use so that the output matches my project's stack and design system.

**Why this priority**: Enables the tool to be agnostic and extensible. **Note:** Svelte support is the primary implementing target (P1). React/Next.js support is P2/Deferred.

**Independent Test**: Can be tested by running the generator with different `--adapter` flags and comparing output structure.

**Acceptance Scenarios**:

1. **Given** a schema, **When** I run with `--ui-framework svelte --ui-kit shadcn`, **Then** the output contains Svelte code with Shadcn-specific components.
2. **Given** a schema, **When** I run with `--ui-framework react --ui-kit daisyui`, **Then** the output contains React code with DaisyUI classes.
3. **Given** a schema, **When** I run with `--ui-kit tailwind`, **Then** the output contains plain HTML elements styled with Tailwind utility classes.

---

### User Story 3 - CLI Usage (Priority: P1)

As a dev, I want a simple CLI interface to run the generator from my terminal.

**Why this priority**: Primary interface for the tool.

**Independent Test**: Verify `help` command and argument parsing.

**Acceptance Scenarios**:

1. **Given** installed `zo-ui`, **When** I run `npx zo-ui --help`, **Then** I see available commands and options.
2. **Given** a schema file, **When** I run `npx zo-ui validate --schema ./schema.ts`, **Then** it reports if the schema is valid or lists errors.

## Requirements

### Functional Requirements

- **FR-001**: System MUST be able to load TypeScript files containing Zod schemas at runtime without requiring a full project build.
- **FR-002**: System MUST convert loaded Zod schemas into a traversal-friendly format (e.g., JSON Schema).
- **FR-003**: System MUST provide an Adapter interface allowing definition of how different data types (String, Number, Array) are rendered.
- **FR-004**: System MUST include "Shadcn" adapters that branch logic based on the framework:
    - **Svelte**: MUST generate code compatible with `shadcn-svelte` using **Bits UI** primitives and Svelte 5 **Runes** syntax.
    - **React**: MUST generate code compatible with `shadcn/ui` using **Radix UI** primitives and React Hooks.
- **FR-005**: System MUST provide a CLI command `generate` accepting `--schema`, `--output`, `--ui-framework`, and `--ui-kit` arguments.
- **FR-006**: System MUST generate a component file valid for the specified UI framework and UI kit at the specified output path.
- **FR-007**: System MUST parse `.describe()` JSON metadata from Zod fields to determine specific component rendering (e.g., 'radio', 'textarea') overrides.
- **FR-008**: System MUST support a `--form-lib` flag. When set to `superforms` (for Svelte), it MUST wrap the component in `sveltekit-superforms` boilerplate. Default behavior is static UI only.
- **FR-009**: System MUST attempt to read `components.json` (or `zo.config.json`) to determine import paths for UI components.
- **FR-010**: System MUST map Zod constraints (min, max, regex) to standard HTML5 input attributes (min, max, pattern) where applicable.
- **FR-011**: System MUST include a "Tailwind" adapter that generates semantic HTML tags (e.g. `input`, `select`) styled with standard Tailwind utility classes.
- **FR-012**: System CI/CD configuration (`.pre-commit-config.yaml`, `ci.yml`) MUST be updated to include linting, testing, and security scanning for the new generator codebase.
- **FR-013**: System MUST render nested Zod objects as visually grouped sections (e.g., fieldsets) within the single output file, avoiding multi-file fragmentation.
- **FR-014**: System MUST check if the output file exists and prompt the user for confirmation before overwriting, unless a `--force` flag is provided.
- **FR-015**: System MUST support a `--type` (alias `--schema`) argument to select a specific Zod schema export from the source file.
- **FR-016**: System MUST scan the source file for all exported Zod schemas and prompt the user to select one if `--type` is not provided and multiple exist.
- **FR-017**: System MUST provide a `validate` subcommand that verifies a source file exports valid Zod schema(s) without generating code.
- **FR-018**: System MUST support a `--all` flag for the `validate` subcommand to recursively scan and validate all detected `schema.ts` (or configured) files in the project.
- **FR-019**: System MUST support a `--json` flag for the `validate` command to output results in a structured JSON format suitable for CI/CD parsing.
- **FR-020**: System MUST provide a comprehensive `--help` output for all commands, detailing every available flag and argument.
- **FR-021**: A comprehensive `README.md` MUST be created, documenting all features, parameter references, and providing `npx` usage examples.
- **FR-022**: System MUST implement a 3-tier configuration resolution strategy: CLI args override Environment Variables, which override Config File values.
- **FR-023**: System MUST support configuration via standard Environment Variables (e.g., `ZO_UI_FRAMEWORK`) for all major options.
- **FR-024**: System MUST implement structured logging with configurable levels (error, warn, info, debug) via `--log-level` flag or `--verbose` shortcut.

### Key Entities

- **Schema**: The source Zod definition.
- **Adapter**: A plugin defining rendering logic for schema types.
- **FieldInfo**: Standardized information about a schema field (key, label, type) passed to adapters.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can generate a valid component from a simple Zod schema in under 2 seconds.
- **SC-002**: Generated "Shadcn" components compile without template syntax errors in a standard SvelteKit project (assuming Shadcn components exist).
- **SC-003**: System successfully extracts schema from a TypeScript file with at least 5 different Zod types (string, number, array, boolean, object).
