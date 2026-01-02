import type { Adapter, SchemaInfo, GeneratorOptions } from '@zo-ui/core';
import { generateInput, generateTextarea } from './generators/svelte/input';
import { generateSelect } from './generators/svelte/select';
import { generateForm } from './generators/svelte/form';
import { ComponentResolver } from './resolver';
import * as fs from 'fs';
import * as path from 'path';

export class ShadcnSvelteAdapter implements Adapter {
    name = '@zo-ui/adapter-shadcn-svelte';

    async generate(schema: SchemaInfo, options: GeneratorOptions): Promise<void> {
        console.log(`Generating Svelte 5 components for ${schema.name} in ${options.outputDir}...`);

        // const resolver = new ComponentResolver(process.cwd());
        const fieldsContent: string[] = [];

        for (const field of schema.fields) {
            let content = '';
            if (field.metadata?.hidden) continue;

            switch (field.type) {
                case 'string':
                    if (field.metadata?.format === 'textarea' || (field.metadata?.maxLength && field.metadata.maxLength > 100)) {
                        content = generateTextarea(field);
                    } else {
                        content = generateInput(field);
                    }
                    break;
                case 'number':
                    content = generateInput(field);
                    break;
                // ... more types
                default:
                    content = generateInput(field);
            }
            fieldsContent.push(content);
        }

        const formContent = generateForm(fieldsContent.join('\n'), schema.name);

        const outputPath = path.resolve(options.outputDir, `${schema.name}Form.svelte`);
        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }
        fs.writeFileSync(outputPath, formContent);
        console.log(`Generated ${outputPath}`);
    }
}
