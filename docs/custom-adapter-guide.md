
# Custom Adapter Development Guide

`zo-ui` supports custom adapters to generate UI components for any framework or design system.

## 1. Create a Node Package

Your adapter should be a standard Node.js package (ESM recommended).

```json
{
  "name": "my-custom-adapter",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module"
}
```

## 2. Implement `AdapterPlugin` Interface

Install `@zo-ui/types`:
```bash
npm install @zo-ui/types
```

Implement the interface in your entry file:

```typescript
import { AdapterPlugin, UITree, GeneratedFile } from '@zo-ui/types';

export const adapter: AdapterPlugin = {
    name: "my-custom-adapter",
    version: "1.0.0",

    async generate(tree: UITree): Promise<GeneratedFile[]> {
        // 1. Traverse tree.root
        // 2. Generate code string
        // 3. Return array of files
        return [{
            filename: "MyComponent.svelte",
            content: "<h1>Hello World</h1>"
        }];
    },

    getComponentList(): string[] {
        return ['input-text', 'my-custom-component'];
    }
};
```

## 3. Configure `zo-ui`

In your project's `zo.config.json`:

```json
{
  "adapter": "./path/to/my-custom-adapter"
}
```

## 4. Run Generation
```bash
npx zo-ui generate schema.ts
```
