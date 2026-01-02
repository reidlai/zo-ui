# zo-ui Scaffold Generator

> **Schema-First UI Generation for Modern Web Apps**

`zo-ui` is a powerful CLI tool that drastically speeds up UI development by generating production-ready components directly from your Zod schemas. Instead of manually writing boilerplate for forms, inputs, and validation logic, you define your data model once, and `zo-ui` builds the UI for you.

## The Problem
Building forms and UI components for data entry is often repetitive and error-prone:
- You write the database schema or API type.
- You manually create the UI components (inputs, selects, checkboxes).
- You wire up validation logic (which duplicates the schema rules).
- You handle loading states, error messages, and accessibility.
- When the data model changes, you have to update code in 3+ places.

## The Solution
**`zo-ui` treats your Zod schema as the single source of truth.** 

By introspecting your Zod definitions, it generates high-quality, fully-typed UI components that are ready to drop into your application. It's not just a scaffolding tool—it's a workflow accelerator.

## Key Benefits

### 1. 🚀 Massive Productivity Boost
Skip the boilerplate. Generate complex, multi-field forms with validation, labels, and descriptions in seconds. Focus on your app's unique logic, not on typing `<input type="text" ... />` for the thousandth time.

### 2. 💎 Production-Quality Code
The potential output isn't "starter code"—it's code you'd want to write yourself.
- **Svelte 5 Support**: Leverages the latest Runes syntax for clean, effective reactivity.
- **Shadcn UI Integration**: Generates components that perfectly match your existing Shadcn design system.
- **Accessibility Built-in**: Proper ARIA labels, focus management, and semantic HTML.

### 3. 🛡️ Robust Type Safety
Since the UI is generated from Zod, your forms are guaranteed to match your data expectations. Validation rules like `min`, `max`, `email`, and `regex` are automatically translated into frontend validation.

### 4. 🔄 Framework Agnostic (via Adapters)
While we love Svelte, `zo-ui` is built on a pluggable adapter architecture.
- **Available Now**: Svelte 5 + Shadcn UI
- **Available Now**: Native HTML + Tailwind
- **Coming Soon**: React, Vue, Solid

## Workflow

1.  **Define**: Create a standard `zod` schema file.
2.  **Configure** (Optional): Tell `zo-ui` which adapter to use (e.g., `@zo-ui/adapter-shadcn`).
3.  **Generate**: Run the CLI directly from GitHub using `npx`.

## Quick Start

### 1. Define a Schema
Create `schema.ts`:

```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().describe('Full Name'),
  email: z.string().email().describe('Email Address'),
  role: z.enum(['admin', 'user', 'guest']).default('user').describe('User Role'),
  bio: z.string().max(500).describe('Short Bio').optional()
});
```

### 2. Generate Components
Run the generator directly using `npx` with your GitHub repository path (replace `username/zo-ui` with your actual repo path):

```bash
npx github:username/zo-ui generate --schema ./schema.ts --adapter shadcn-svelte --output ./src/lib/components/user-form
```

You'll get a fully functional `UserSchemaForm.svelte` ready to use!

## CLI Reference

### `generate`
Scaffolds UI components from a schema.

- `-s, --schema <path>`: Path to the Zod schema file (required).
- `-a, --adapter <name>`: The UI adapter to use (default: `shadcn-svelte`).
- `-o, --output <path>`: Directory where components will be generated (default: `src/lib/components`).

### `validate`
Checks if a schema file is valid and readable by the parser.

```bash
npx github:username/zo-ui validate ./schema.ts
```
