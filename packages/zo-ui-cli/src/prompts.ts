import inquirer from 'inquirer';
import type { Config } from '@zo-ui/core';

export async function promptForConfig(current: Partial<Config>): Promise<Partial<Config>> {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'schemaPath',
            message: 'Path to schema file:',
            default: current.schemaPath || 'schema.ts',
            when: !current.schemaPath
        },
        {
            type: 'list',
            name: 'adapter',
            message: 'Choose adapter:',
            choices: ['shadcn-svelte', 'tailwind'],
            default: current.adapter || 'shadcn-svelte',
            when: !current.adapter
        },
        {
            type: 'input',
            name: 'outputDir',
            message: 'Output directory:',
            default: current.outputDir || 'src/lib/components',
            when: !current.outputDir
        }
    ]);

    return { ...current, ...answers };
}
