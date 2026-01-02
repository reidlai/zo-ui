import type { FieldInfo } from '@zo-ui/core';

export function generateInput(field: FieldInfo): string {
    const label = field.description || field.name;
    const type = field.type === 'number' ? 'number' : 'text'; // Simplified

    // Svelte 5 Snippet / Component usage
    return `
  <div class="space-y-2">
    <Label for="${field.name}">${label}</Label>
    <Input
      id="${field.name}"
      name="${field.name}"
      type="${type}"
      ${field.optional ? '' : 'required'}
      aria-describedby="${field.name}-desc"
    />
  </div>`;
}

export function generateTextarea(field: FieldInfo): string {
    const label = field.description || field.name;
    return `
    <div class="space-y-2">
      <Label for="${field.name}">${label}</Label>
      <Textarea
        id="${field.name}"
        name="${field.name}"
        ${field.optional ? '' : 'required'}
      />
    </div>`;
}
