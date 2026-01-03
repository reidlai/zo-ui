"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadcnAdapter = void 0;
const resolver_1 = require("./resolver");
exports.ShadcnAdapter = {
    name: "@zo-ui/adapter-shadcn",
    version: "0.0.1",
    async generate(tree) {
        const resolver = new resolver_1.ComponentResolver();
        const imports = new Set();
        const html = generateNode(tree.root, imports, resolver);
        // Generate script block
        let script = '<script lang="ts">\n';
        imports.forEach(imp => script += `${imp}\n`);
        script += '</script>\n\n';
        const content = `${script}${html}`;
        const filename = tree.schemaName ? `${tree.schemaName}.svelte` : 'GeneratedComponent.svelte';
        return [{
                filename,
                content
            }];
    },
    getComponentList() {
        return ['input-text', 'input-number', 'switch', 'textarea', 'datepicker', 'select'];
    }
};
function generateNode(node, imports, resolver) {
    if (node.type === 'container') {
        const c = node;
        const children = c.children.map(child => generateNode(child, imports, resolver)).join('\n');
        return `<div class="space-y-4">\n${children}\n</div>`;
    }
    if (node.type === 'component') {
        return generateComponent(node, imports, resolver);
    }
    return '';
}
function generateComponent(node, imports, resolver) {
    const { componentId, fieldName } = node;
    const label = fieldName; // Capitalize in real app
    imports.add(`import { Label } from "${resolver.resolve('Label')}";`);
    switch (componentId) {
        case 'input-text':
            imports.add(`import { Input } from "${resolver.resolve('Input')}";`);
            return `
    <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="${fieldName}">${label}</Label>
        <Input type="text" id="${fieldName}" placeholder="${label}" />
    </div>`;
        case 'input-number':
            imports.add(`import { Input } from "${resolver.resolve('Input')}";`);
            return `
    <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="${fieldName}">${label}</Label>
        <Input type="number" id="${fieldName}" placeholder="${label}" />
    </div>`;
        case 'switch':
            imports.add(`import { Switch } from "${resolver.resolve('Switch')}";`);
            return `
    <div class="flex items-center space-x-2">
        <Switch id="${fieldName}" />
        <Label htmlFor="${fieldName}">${label}</Label>
    </div>`;
        case 'textarea':
            imports.add(`import { Textarea } from "${resolver.resolve('Textarea')}";`);
            return `
    <div class="grid w-full gap-1.5">
        <Label htmlFor="${fieldName}">${label}</Label>
        <Textarea placeholder="Type your message here." id="${fieldName}" />
    </div>`;
        case 'datepicker':
            // Simplified datepicker representation
            imports.add(`import { Button } from "${resolver.resolve('Button')}";`);
            imports.add(`import { Calendar } from "${resolver.resolve('Calendar')}";`);
            imports.add(`import { Popover, PopoverContent, PopoverTrigger } from "${resolver.resolve('Popover')}";`);
            return `
    <div class="flex flex-col space-y-2">
        <Label htmlFor="${fieldName}">${label}</Label>
        <Popover>
            <PopoverTrigger asChild let:builder>
                <Button variant="outline" builders={[builder]}>Pick a date</Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
                <Calendar bind:value={date} />
            </PopoverContent>
        </Popover>
    </div>`;
        case 'select':
            imports.add(`import * as Select from "${resolver.resolve('Select')}";`);
            return `
    <div class="flex flex-col space-y-2">
        <Label>${label}</Label>
        <Select.Root>
            <Select.Trigger class="w-[180px]">
                <Select.Value placeholder="Select..." />
            </Select.Trigger>
            <Select.Content>
                <Select.Item value="option1">Option 1</Select.Item>
                <Select.Item value="option2">Option 2</Select.Item>
            </Select.Content>
        </Select.Root>
    </div>`;
        default:
            return `<!-- Unknown component: ${componentId} -->`;
    }
}
//# sourceMappingURL=index.js.map