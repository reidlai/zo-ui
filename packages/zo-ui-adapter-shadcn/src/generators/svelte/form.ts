import type { FieldInfo } from '@zo-ui/core';

export function generateForm(fieldsContent: string, schemaName: string): string {
    return `
<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { ${schemaName}Schema } from './schema';
  
  let { data } = $props();
  
  const form = superForm(data.form, {
    validators: zodClient(${schemaName}Schema)
  });
  
  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-6">
${fieldsContent}
  <Form.Button>Submit</Form.Button>
</form>`;
}
