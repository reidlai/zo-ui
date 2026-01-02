# Data Model - zo-ui Scaffold Generator

## Interfaces

### GeneratorOptions
Configuration object passed to the core generator logic.

```typescript
interface GeneratorOptions {
  schemaPath: string;      // Path to schema.ts
  schemaName?: string;     // Specific export name (optional)
  outputPath: string;      // Path to output file
  uiFramework: 'svelte' | 'react' | 'nextjs';
  uiKit: 'shadcn' | 'daisyui' | 'tailwind';
  formLib?: 'superforms' | 'none';
  force?: boolean;         // Overwrite without prompt
}
```

### Adapter
Interface that all UI Kit adapters must implement.

```typescript
interface Adapter {
  name: string;
  framework: 'svelte' | 'react';
  
  /**
   * Generates the component code string.
   */
  generate(schema: JSONSchema7, options: AdapterOptions): Promise<string>;
}

interface AdapterOptions {
  componentName: string;
  importPathResolver: (component: string) => string; // e.g., 'Card' -> '$lib/components/ui/card'
}
```

### ComponentMetadata
Extracted from Zod `.describe()` JSON.

```typescript
interface ComponentMetadata {
  component?: 'input' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'switch';
  label?: string;
  placeholder?: string;
  class?: string; // Tailwind overrides
}
```
