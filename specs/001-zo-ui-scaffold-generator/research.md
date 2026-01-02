# Research Findings - zo-ui Scaffold Generator

## Decisions

### 1. Runtime Schema Loading: `jiti`
- **Decision**: Use `jiti` to load `schema.ts` files.
- **Rationale**: `jiti` allows requiring TypeScript files directly in Node.js without a separate compilation step. It supports ESM/CJS interop seamlessly, which is critical for a CLI tool running in various user environments.
- **Alternatives**: 
    - `ts-node`: Heavier, often requires peer deps or specific `tsconfig.json` setups.
    - `swc/register`: Faster than `ts-node` but still requires intricate config.
    - Dynamic `import()`: Native but fails on `.ts` files without a loader.

### 2. CLI Framework: `commander`
- **Decision**: Use `commander` for the CLI interface.
- **Rationale**: Industry standard, robust parsing for options (including variadic args), and auto-generated help pages (satisfying FR-020).
- **Alternatives**:
    - `yargs`: Also good, but `commander`'s API is slightly more declarative for subcommands like `generate` and `validate`.

### 3. Zod Traversal: `zod-to-json-schema`
- **Decision**: Convert Zod schemas to JSON Schema using `zod-to-json-schema` before traversal.
- **Rationale**: Traversing raw Zod defs is brittle (internal API changes). JSON Schema is a stable, standard format that allows easier mapping to UI components (e.g., `enum` -> `select`, `string` + `format:email` -> `input[type=email]`).
- **Alternatives**:
    - Raw Zod traversal: Harder to maintain, requires handling every Zod subclass (ZodString, ZodNumber, ZodOptional, etc.) manually.
    
### 4. Component Architecture: Separate Adapters
- **Decision**: Implement `zo-ui-adapter-shadcn-svelte` and `zo-ui-adapter-shadcn-react` as distinct packages.
- **Rationale**: The HTML structure and logic (Runes vs Hooks) are too different to share strict logic. Separate adapters ensure cleaner, idiomatic code generation (FR-004).

## Needs Clarification Resolutions
- **CI/CD**: `moon.yml` appears missing in root. Will proceed assuming standard `pnpm` workspace structure and create/update CI configs assuming a standard `packages/*` layout.
