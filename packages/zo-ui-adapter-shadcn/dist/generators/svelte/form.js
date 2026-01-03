"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateForm = generateForm;
function generateForm(fieldsContent, schemaName) {
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
//# sourceMappingURL=form.js.map