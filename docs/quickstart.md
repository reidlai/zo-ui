# Quickstart Guide

This guide will help you generate your first form using `zo-ui`.

## Prerequisites

- Node.js 20+
- pnpm

## Steps

1. **Install Dependencies**

   ```bash
   pnpm install
   ```

2. **Create a Schema**

   Create a file named `blog-schema.ts`:

   ```typescript
   import { z } from 'zod';

   export const BlogPost = z.object({
     title: z.string().min(5).describe('Post Title'),
     content: z.string().describe('Content').metadata({ format: 'textarea' }),
     published: z.boolean().default(false),
     tags: z.array(z.string())
   });
   ```

3. **Generate a Form**

   Run the generator:

   ```bash
   # From the package root (if running locally via monorepo)
   ./packages/zo-ui-cli/bin/zo-ui.js generate --schema blog-schema.ts --adapter shadcn-svelte --output ./output
   ```

4. **Check Output**

   Look in `./output/BlogPostForm.svelte`. You should see a Svelte 5 component with:
   - Superforms setup
   - Zod validation
   - ShadCN Input and Textarea components
   - Submit button

## Next Steps

- Explore `packages/zo-ui-adapter-shadcn` to customize generation.
- create your own adapter.
