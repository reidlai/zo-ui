# CLI Interface - zo-ui

## Commands

### `generate`
Scaffold a UI component from a Zod schema.

**Usage**:
`npx zo-ui generate --schema <path> --output <path> [options]`

**Arguments**:
- `--schema, -s <path>`: (Required) Path to the TypeScript file containing Zod schema.
- `--output, -o <path>`: (Required) Output path for the generated component (e.g., `src/lib/Widget.svelte`).

**Options**:
- `--type, -t <name>`: Specific export name if multiple schemas exist.
- `--ui-framework <name>`: `svelte` (default), `react`, `nextjs`.
- `--ui-kit <name>`: `shadcn` (default), `daisyui`, `tailwind`.
- `--form-lib <name>`: `superforms` (Svelte only), `none`.
- `--force, -f`: Overwrite existing files without prompting.
- `--log-level <level>`: `error`, `warn`, `info`, `debug`.

---

### `validate`
Verify a schema file without generating code.

**Usage**:
`npx zo-ui validate [options]`

**Options**:
- `--schema, -s <path>`: Path to a specific schema file.
- `--all`: Batch scan all `schema.ts` files in the project.
- `--json`: Output results in JSON format.
