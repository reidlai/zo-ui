import { Command } from 'commander';
import { loadSchema, parseSchema } from '@zo-ui/core';
import { logger } from '../logger';

export const validateCommand = new Command('validate')
    .description('Validate schema file')
    .argument('<path>', 'Path to schema file')
    .action(async (path) => {
        try {
            logger.info(`Validating schema at ${path}...`);
            const schemas = await loadSchema(path, process.cwd());

            const count = Object.keys(schemas).length;
            if (count === 0) {
                logger.warn('No schemas found.');
            } else {
                logger.success(`Found ${count} valid Zod schemas.`);
                for (const [name, schema] of Object.entries(schemas)) {
                    const info = parseSchema(name, schema);
                    logger.info(`- ${name}: ${info.fields.length} fields`);
                }
            }
        } catch (err: any) {
            logger.error(`Validation failed: ${err.message}`);
            process.exit(1);
        }
    });
