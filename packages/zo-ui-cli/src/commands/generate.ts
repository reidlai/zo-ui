import { Command } from 'commander';
import { loadConfig, loadSchema, parseSchema } from '@zo-ui/core';
import { ShadcnSvelteAdapter } from '@zo-ui/adapter-shadcn';
import { TailwindAdapter } from '@zo-ui/adapter-tailwind';
import { logger } from '../logger';
import { resolve } from 'path';

export const generateCommand = new Command('generate')
    .description('Generate UI components from schema')
    .option('-s, --schema <path>', 'Path to schema file')
    .option('-a, --adapter <name>', 'Adapter to use (shadcn-svelte, tailwind)')
    .option('-o, --output <path>', 'Output directory')
    .action(async (options) => {
        try {
            logger.info('Starting generation...');

            const config = await loadConfig(process.cwd(), {
                schemaPath: options.schema,
                adapter: options.adapter,
                outputDir: options.output
            });

            const schemas = await loadSchema(config.schemaPath, process.cwd());

            let adapterImpl;
            if (config.adapter === '@zo-ui/adapter-shadcn' || config.adapter === 'shadcn-svelte') {
                adapterImpl = new ShadcnSvelteAdapter();
            } else if (config.adapter === '@zo-ui/adapter-tailwind' || config.adapter === 'tailwind') {
                adapterImpl = new TailwindAdapter();
            } else {
                throw new Error(`Unknown adapter: ${config.adapter}`);
            }

            for (const [name, schema] of Object.entries(schemas)) {
                const schemaInfo = parseSchema(name, schema);
                await adapterImpl.generate(schemaInfo, {
                    adapter: config.adapter,
                    outputDir: config.outputDir
                });
            }

            logger.success('Generation complete!');
        } catch (err: any) {
            logger.error(err.message);
            process.exit(1);
        }
    });
