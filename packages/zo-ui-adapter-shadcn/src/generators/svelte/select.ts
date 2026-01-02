import type { FieldInfo } from '@zo-ui/core';

export function generateSelect(field: FieldInfo): string {
    const label = field.description || field.name;
    return `
  <div class="space-y-2">
    <Label>${label}</Label>
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select ${label}" />
      </Select.Trigger>
      <Select.Content>
         <!-- Options would be populated here if enum metadata exists -->
         <Select.Item value="option1">Option 1</Select.Item>
      </Select.Content>
    </Select.Root>
  </div>`;
}
