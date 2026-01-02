# Feature Specification: Enhance Reading Schema with UI Mapping

**Feature Branch**: `002-enhance-reading-schema`
**Created**: 2026-01-02
**Status**: Draft
**Input**: User description: "Need to enhance reading schema. In shadcn (NextJS/React or Svelte version), there are many components. There is no setting to instruct zo-ui how to map different attributes to different UI components. It is required to have default mapping but developer can reconfigure UI component mapping and there should be option in Zod schema to specify which components should be used to render widget. there should also be additional document in docs/ to show all available ui component code so developer can enter the code or id to specify which component should be used. Different document for different UI Kit is required"

## User Scenarios & Testing

### User Story 1 - Default Component Mapping (Priority: P1)

As a developer running the `zo-ui` generator, I want the system to automatically generate standard UI components for my Zod types so that I don't have to manually write boilerplate for every field.

**Why this priority**: Essential functionality to reduce boilerplate.

**Independent Test**: Run generator on a schema with string, number, and boolean fields; verify the output file contains `Input`, `Input type="number"`, and `Checkbox/Switch` components respectively.

**Acceptance Scenarios**:

1. **Given** a Zod schema with `z.string()`, **When** the generator runs, **Then** a standard text input component code is generated.
2. **Given** a Zod schema with `z.boolean()`, **When** the generator runs, **Then** a switch or checkbox component code is generated.
3. **Given** a Zod schema with `z.number()`, **When** the generator runs, **Then** a numeric input component code is generated.

### User Story 2 - Explicit Component Override (Priority: P1)

As a developer, I want to specify explicitly which UI component to use for a specific field within the Zod schema definition, so that I can use specialized components (e.g., specific Select, DatePicker, or custom widget) instead of the default.

**Why this priority**: detailed control over UI rendering is the core request of this feature.

**Independent Test**: Define a Zod string field with metadata specifying a "textarea" component; verify it renders as a textarea instead of a text input.

**Acceptance Scenarios**:

1. **Given** a Zod schema field defined as `z.string().describe('ui:textarea')` (or similar metadata syntax), **When** rendered, **Then** the `TextArea` component is used instead of `Input`.
2. **Given** an invalid or unknown component ID in the schema metadata, **When** rendered, **Then** the system falls back to the default component and logs a warning.

### User Story 3 - Component Reference Documentation (Priority: P2)

As a developer, I want to view a comprehensive list of available UI components and their IDs for my specific UI Kit (e.g., Shadcn Svelte), so that I know exactly what string identifiers to use in my Zod schema mappings.

**Why this priority**: Developers cannot effectively use the override feature (Story 2) without knowing the valid values.

**Independent Test**: Navigate to the documentation folder; verify separate files exist for supported UI Kits listing components and their IDs.

**Acceptance Scenarios**:

1. **Given** I am browsing the project documentation, **When** I open `docs/ui-kit-shadcn-svelte.md`, **Then** I see a table of Zod types and their corresponding Component IDs.
2. **Given** I am using a different UI kit (e.g., React), **When** I check `docs/`, **Then** I find a separate reference document `docs/ui-kit-shadcn-react.md` tailored to that kit.

### Edge Cases

- **Invalid Component ID**: If a developer specifies a component ID that doesn't exist in the registry, the system should log a warning and fallback to the default component for that Zod type.
- **Missing Default Mapping**: If a Zod type has no default mapping (e.g., a custom ZodType), the system should render a generic fallback widget (e.g., a simple text input or JSON view) or log a helpful error, rather than crashing.
- **Null/Undefined Schema**: System should gracefully handle empty or malformed schema definitions without breaking the entire UI.

## Clarifications

## Clarifications

### Session 2026-01-02

- Q: Code Generation vs. Runtime Rendering → A: **Static Code Generation** (Option B).
- Q: Global Default Configuration → A: **Dedicated `zo.config.json`** (Option B).
- Q: Zod Metadata Syntax → A: **Native String Prefix `.describe("ui:<id>")`** (Option A).
- Q: Adapter Selection Strategy → A: **Config Field** (Option A). Specify `"adapter": "..."` in `zo.config.json`. The CLI must look for this file in the current working directory (CWD), supporting `npx` execution without local installation.
- Q: Component Output Strategy → A: **Colocation with Schema** (Option C). Generated components MUST be placed in the same directory as the source Zod schema file (e.g., `schema.ts` -> `schema.svelte`).
- Q: Custom Adapter Extensibility → A: **Full Plugin System** (Option C). System must support third-party adapter packages via a robust interface.
- Q: Adapter Resolution Strategy → A: **Explicit Package/Path** (Option A). The `adapter` field supports NPM package names (resolvable via Node `require`) or relative local paths (e.g., `./adapters/my-adapt.js`).
- Q: Component Property Configuration → A: **Inference & Defaults Only** (Option A). The `.describe()` method is strictly for Component ID selection. Presentational props (placeholders, variants) MUST be inferred from Zod constraints (min/max/optional) or handled by the component implementation, NOT injected via generic metadata.
- Q: Docs Generation Strategy → A: **Explicit Command** (Option A). A dedicated command (e.g., `zo-ui docs` alias) is required to trigger documentation generation.
- Q: Custom Adapter Guide → A: **Required Static Documentation**. A dedicated guide `docs/custom-adapter-guide.md` MUST be created to instruct developers on building compliant adapters using the Plugin Interface.
- Q: Adapter Output Responsibility → A: **Full File Content** (Option B). Since Adapters represent entire User Interface Frameworks (e.g., Next.js, Svelte), they MUST control the entire generated file output (imports, syntax, file extension) rather than just partial snippets.
- Q: Adapter Compliance Validation → A: **Runtime Interface Check** (Option A). The CLI must strictly validate that any loaded adapter implements the required Plugin Interface methods before attempting generation, failing fast with a descriptive error if invalid.
- Q: Plugin Interface Distribution → A: **Standalone Package** (Option B). A dedicated package (e.g., `@zo-ui/core-types`) MUST be created to export the Plugin Interface definitions, ensuring adapter authors can implement it without installing the heavy CLI core.
- Q: Missing Config Behavior → A: **Implicit Fallback** (Option A). If `zo.config.json` is missing, the system MUST warn the user and proceed using the default built-in adapter (Shadcn Svelte).
- Q: Mapping Responsibility → A: **Core Resolves** (Option A). The Core CLI acts as the "Controller": it traverses the Zod schema, resolves all mappings (Defaults + Config + Metadata), and passes a fully resolved "Component Tree" or "UI Spec" to the Adapter. The Adapter is responsible for **Implementation/Syntax Generation only**, not logical traversal.
- Q: Recursive Resolution Strategy → A: **Pre-Resolved Tree** (Option A). The Core CLI produces a fully nested `UITree` object before invoking the adapter. Nested Zod Objects are resolved as **Container/Block Nodes** containing children, allowing adapters to render grouping UI (e.g., Cards, Fieldsets) around nested components.
- Q: Runtime Error Strategy → A: **Fail Fast & Rollback** (Option A). If the adapter throws an error during generation of ANY component, the CLI MUST abort immediately and ensure NO files are written to disk (atomic operation), preventing partial/broken codebase state.

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide a default mapping registry used by the **CLI Generator** that links standard Zod primitive types to specific UI tokens/component IDs.
- **FR-002**: System MUST support a `zo.config.json` file to override default mappings. Keys MUST be Zod types (or subtypes), and Values MUST be valid **UI Kit Component IDs** (e.g., "calendar", "textarea", "switch").
- **FR-003**: System MUST parse Zod schema metadata using the standard `.describe("ui:<component-id>")` syntax. This syntax is RESTRICTED to Component IDs only; passing arbitrary props or JSON is NOT supported.
- **FR-004**: System MUST determine the active UI Adapter by reading the `adapter` field in `zo.config.json`. This field MUST support **NPM package references** or **relative file paths** resolved from the config file's location.
- **FR-008**: System MUST define a public **Plugin Interface** (TypeScript) allowing external modules to provide component mappings and generation logic.
- **FR-012**: System MUST publish/provide a **standalone types package** (e.g., `@zo-ui/core-types` or similar) containing the Plugin Interface definitions to facilitate development of custom adapters with zero runtime dependencies on the CLI.
- **FR-013**: The Core CLI MUST implement a **Schema Resolver** engine that accepts a Zod Schema and produces a language-agnostic **UI Specification Tree**. This tree contains resolved Component IDs for every field. Nested Objects MUST be resolved as **Container Nodes** (e.g., `type: 'group'`) capable of holding child nodes, allowing adapters to render wrapping UI elements (Cards, Sections).
- **FR-010**: The Plugin Interface MUST define a method (e.g., `generateComponent`) that receives the **UI Specification Tree** (from FR-013) and returns the **complete file contents** (string) and intended filename.
- **FR-011**: System MUST **validate** the loaded adapter module at runtime against the Plugin Interface contract. If the adapter is missing required methods or properties, the CLI MUST exit with a specific error message describing the missing implementation.
- **FR-014**: The CLI Generator MUST implement **Atomic Write** behavior. It MUST prepare all file contents in memory and only write to disk if successful. If the Adapter fails (throws) during any part of the generation, the process MUST exit with an error code and write ZERO files.
- **FR-005**: System MUST provide a dedicated CLI command (e.g., `docs` or `reference`) to **explicitly generate documentation**. This command extracts valid UI Component IDs from the active adapter and saves them to `docs/` as Markdown.
- **FR-009**: System MUST include a static documentation file `docs/custom-adapter-guide.md` detailing the **Plugin Interface**, lifecycle methods, and examples of creating a custom UI adapter.
- **FR-006**: CLI MUST resolve `zo.config.json` from the Current Working Directory (CWD). If the file is missing, the system MUST **warn** the user and automatically fallback to the default internal adapter (Shadcn Svelte).
- **FR-007**: Generated component files MUST be colocated with their source Zod schema file by default, unless overridden by CLI arguments.

### Key Entities

- **ComponentRegistry**: A dictionary/map structure holding the relationship between `ZodType` -> `DefaultComponentID` and `ComponentID` -> `Implementation`.
- **SchemaMetadata**: The format/structure used within Zod definitions to pass UI hints (e.g., JSON structure inside `description` or a custom `meta` field).

## Success Criteria

### Measurable Outcomes

- **SC-001**: Developers can override a component type using Zod metadata with < 2 lines of additional code per field.
- **SC-002**: Documentation covers 100% of the core UI components available in the currently supported Shadcn implementation.
- **SC-003**: 100% of standard Zod primitives (String, Number, Boolean, Enum, Date) have a defined default UI component.
