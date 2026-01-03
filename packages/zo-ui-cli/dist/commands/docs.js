"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsCommand = void 0;
const commander_1 = require("commander");
const core_1 = require("@zo-ui/core");
// Import Shadcn from adapter directly for now if fallback logic needed, 
// OR rely on PluginLoader to load it dynamically.
const adapter_shadcn_1 = require("@zo-ui/adapter-shadcn"); // for types or fallback
const logger_1 = require("../logger");
exports.docsCommand = new commander_1.Command('docs')
    .description('Generate documentation for available UI components')
    .option('-a, --adapter <name>', 'Adapter to query')
    .action(async (options) => {
    try {
        logger_1.logger.info('fetching component list...');
        let adapterName = options.adapter;
        if (!adapterName) {
            // Load config
            const config = await core_1.ConfigLoader.load(process.cwd());
            adapterName = config.adapter || '@zo-ui/adapter-shadcn';
        }
        let adapter;
        // US2 Logic: Dynamic Load
        if (adapterName === '@zo-ui/adapter-shadcn' || adapterName === 'shadcn-svelte') {
            adapter = adapter_shadcn_1.ShadcnAdapter; // Use bundled for now
        }
        else {
            try {
                adapter = await core_1.PluginLoader.load(adapterName, process.cwd());
            }
            catch (e) {
                logger_1.logger.warn(`Failed to dynamic load ${adapterName}. Fallback to shadcn.`);
                adapter = adapter_shadcn_1.ShadcnAdapter;
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
    }
    catch (err) {
        logger_1.logger.error(err.message);
        process.exit(1);
    }
});
//# sourceMappingURL=docs.js.map