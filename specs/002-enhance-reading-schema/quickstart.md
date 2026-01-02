# Quickstart: Enhancing Reading Schema

**Feature**: `002-enhance-reading-schema`

## Overview
This feature allows you to generate UI components (Svelte, React, etc.) directly from your Zod schemas using configurable "Adapters".

## 1. Installation

Ensure you have the latest `zo-ui` configured.

```bash
pnpm install
# or
moon run zo-ui-cli:build
```

## 2. Configuration

Create or update `zo.config.json` in your project root to specify an adapter.

```json
{
  "adapter": "@zo-ui/adapter-shadcn"
}
```

*Note: If no config is present, it falls back to the internal Svelte adapter.*

## 3. Usage

### Basic Generation
Add metadata to your Zod schema:

```typescript
// schema.ts
import { z } from "zod";

export const UserSchema = z.object({
  bio: z.string().describe("ui:textarea"), // Metadata override
  age: z.number().min(18)
});
```

Run the generator:

```bash
# Uses the adapter defined in zo.config.json
npx zo-ui generate ./schema.ts
```

Output: `./UserSchema.svelte` (colocated).

### generating Documentation
To see available components for your configured adapter:

```bash
npx zo-ui docs
```
Output: `docs/components.md`

## 4. Creating a Custom Adapter

1. Install definitions: `npm install --save-dev @zo-ui/core-types` (Not yet published, link local).
2. Create `my-adapter.ts`:

```typescript
import type { AdapterPlugin, UITree } from '@zo-ui/core-types';

export const MyAdapter: AdapterPlugin = {
  name: "my-custom-adapter",
  version: "1.0.0",
  async generate(tree: UITree) {
    // ... impl
    return [{ filename: "output.txt", content: "..." }];
  },
  getComponentList() {
    return ["my-widget"];
  }
};
```
