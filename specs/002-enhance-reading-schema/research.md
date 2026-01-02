# Research: Enhance Reading Schema with UI Mapping

**Branch**: `002-enhance-reading-schema` | **Date**: 2026-01-02

## Unknowns Resolved

### 1. Standalone Types Package Location
**Decision**: Create a new workspace package at `packages/zo-ui-types`.
**Rationale**:
- Aligns with existing monorepo structure (`packages/zo-ui-cli`, `packages/zo-ui-adapter-shadcn`).
- Separation of concerns: Allows adapters to depend on *types only* without pulling in the heavy `zo-ui-cli` or `zo-ui-core` logic.
- Enables `npm publish @zo-ui/types` cleanly.

### 2. Adapter Loading Mechanism (ESM vs CJS & Windows)
**Decision**: Use Node.js dynamic `import()` exclusively.
**Rationale**:
- `import(path)` supports both CommonJS (`module.exports`) and ESM (`export default`) modules transparently in Node 20+.
- **Requirement**: Absolute paths MUST be prefixed with `file://` to ensure Windows compatibility (UNC paths/drive letters).
- **Fallback**: Validate `.default` export exists (ESM) and use it; otherwise use the module object itself (CJS interop).

### 3. Schema Traversal Strategy
**Decision**: Custom Recursive Visitor.
**Rationale**:
- `zod-to-json-schema` is powerful but its output is purely JSON Schema standard. It might strip or obscure the specific `ui:` metadata hints we need, or require complex post-parsing.
- A custom visitor can directly map `ZodString`, `ZodNumber`, etc., to our specific `UITree` nodes (`ComponentNode`, `ContainerNode`) in one pass.
- We need to handle `.describe()` parsing specifically for FR-003, which is trivial in a custom visitor (`schema.description`).

## Technology Choices

| Choice | Selected | Alternatives | Reason |
| :--- | :--- | :--- | :--- |
| **Parsing** | **Custom Visitor** | `zod-to-json-schema` | Fine-grained control over metadata and mapping logic. |
| **CLI I/O** | **Atomic Write** | Direct `fs.write` | FR-014 requires atomic safety. Must generate all in-memory first. |
| **Plugin API** | **TypeScript Interface** | JSON Config | Code-based configuration allows logic (e.g., conditional component selection). |

