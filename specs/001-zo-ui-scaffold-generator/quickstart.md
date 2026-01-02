# Quickstart - zo-ui Generator

## Prerequisites
- Node.js 20+
- A project with `zo-ui` installed (or run via `npx`)

## 1. Create a Schema
Create `schema.ts`:

```typescript
import { z } from 'zod';

export const UserProfileSchema = z.object({
  username: z.string().min(3).describe('{"label": "Username", "placeholder": "jdoe"}'),
  role: z.enum(['admin', 'user']).describe('{"component": "select", "label": "Role"}'),
  notifications: z.boolean().describe('{"component": "switch", "label": "Enable Notifications"}'),
});
```

## 2. Generate a Component
Run the generator for Svelte 5 + ShadCN:

```bash
npx zo-ui generate \
  --schema ./schema.ts \
  --output ./src/lib/components/UserProfile.svelte \
  --ui-framework svelte \
  --ui-kit shadcn
```

## 3. Use the Component
In your Svelte page:

```svelte
<script>
  import UserProfile from '$lib/components/UserProfile.svelte';
</script>

<UserProfile />
```

## 4. Validate Schema
Check if your schema is compatible:

```bash
npx zo-ui validate --schema ./schema.ts
```
