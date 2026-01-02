
import { Command } from 'commander';
import { ConfigLoader, PluginLoader } from '@zo-ui/core';
// Import Shadcn from adapter directly for now if fallback logic needed, 
// OR rely on PluginLoader to load it dynamically.
import { ShadcnAdapter } from '@zo-ui/adapter-shadcn'; // for types or fallback
import { logger } from '../logger';

export const docsCommand = new Command('docs')
    .description('Generate documentation for available UI components')
    .option('-a, --adapter <name>', 'Adapter to query')
    .action(async (options) => {
        try {
            logger.info('fetching component list...');

            let adapterName = options.adapter;
            if (!adapterName) {
                // Load config
                const config = await ConfigLoader.load(process.cwd());
                adapterName = config.adapter || '@zo-ui/adapter-shadcn';
            }

            let adapter;
            // US2 Logic: Dynamic Load
            if (adapterName === '@zo-ui/adapter-shadcn' || adapterName === 'shadcn-svelte') {
                adapter = ShadcnAdapter; // Use bundled for now
            } else {
                try {
                    adapter = await PluginLoader.load(adapterName, process.cwd());
                } catch (e: any) {
                    logger.warn(`Failed to dynamic load ${adapterName}. Fallback to shadcn.`);
                    adapter = ShadcnAdapter;
                }
            }

            const components = adapter.getComponentList();

            console.log(`\n### Available Components (${adapter.name} v${adapter.version})\n`);
            console.log('| Component ID | Supported |');
            console.log('|---|---|');
            components.forEach(id => {
                console.log(`| \`${id}\` | ✅ |`);
            });
            console.log('');

        } catch (err: any) {
            logger.error(err.message);
            process.exit(1);
        }
    });
