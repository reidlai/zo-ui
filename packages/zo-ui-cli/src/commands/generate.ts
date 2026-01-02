
import { Command } from 'commander';
import { loadSchema, loadConfig, SchemaResolver, FileWriter, DefaultMapping } from '@zo-ui/core';
import { ShadcnAdapter } from '@zo-ui/adapter-shadcn';
import { logger } from '../logger';
import { resolve as pathResolve } from 'path';

export const generateCommand = new Command('generate')
    .description('Generate UI components from schema')
    .argument('<schema>', 'Path to schema file')
    .option('-a, --adapter <name>', 'Adapter override')
    .option('-o, --output <path>', 'Output directory (default: colocation)')
    .action(async (schemaPath, options) => {
        try {
            logger.info('Starting generation...');

            // FR-006: Resolve Config or Fallback
            let config: any = {};
            try {
                // Assuming loadConfig throws if not found? Or returns empty?
                // For P1, we assume loadConfig logic exists or we handle missing
                config = await loadConfig(process.cwd());
            } catch (e) {
                logger.warn('zo.config.json not found. Falling back to default adapter.');
                config = { adapter: '@zo-ui/adapter-shadcn' };
            }

            // Override config with CLI options
            if (options.adapter) config.adapter = options.adapter;
            // T015: Fallback Logic
            if (!config.adapter) config.adapter = '@zo-ui/adapter-shadcn';

            // Resolve Adapter (US2: Dynamic Loading. US1: Hardcoded switch or dynamic import if local)
            // For US1 we only support Shadcn
            let adapter;
            if (config.adapter === '@zo-ui/adapter-shadcn' || config.adapter === 'shadcn-svelte') {
                adapter = ShadcnAdapter;
            } else {
                throw new Error(`Adapter ${config.adapter} not supported yet in MVP.`);
            }

            // Load Schemas
            const schemas = await loadSchema(schemaPath, process.cwd());
            if (Object.keys(schemas).length === 0) {
                logger.warn('No schemas found in file.');
                return;
            }

            logger.info(`Using adapter: ${adapter.name} v${adapter.version}`);

            // Process Schemas
            for (const [name, schema] of Object.entries(schemas)) {
                logger.info(`Processing schema: ${name}`);

                // 1. Resolve to UI Tree
                const uiTree = SchemaResolver.resolve(schema, { schemaName: name });

                // 2. Generate Files (Adapter)
                // Adapter returns GeneratedFile[]
                const generatedFiles = await adapter.generate(uiTree);

                // 3. Write Files (Atomic)
                // FR-007 Colocation: if options.output not set, use schema dir
                const targetDir = options.output
                    ? pathResolve(process.cwd(), options.output)
                    : pathResolve(process.cwd(), pathResolve(schemaPath, '..')); // colocation

                await FileWriter.writeFiles(generatedFiles, targetDir);
                logger.success(`Generated ${generatedFiles.length} files for ${name}`);
            }

            logger.success('All tasks complete.');
        } catch (err: any) {
            logger.error(`Generation failed: ${err.message}`);
            process.exit(1);
        }
    });
