"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommand = void 0;
const commander_1 = require("commander");
const core_1 = require("@zo-ui/core");
const adapter_shadcn_1 = require("@zo-ui/adapter-shadcn");
const logger_1 = require("../logger");
const path_1 = require("path");
exports.generateCommand = new commander_1.Command('generate')
    .description('Generate UI components from schema')
    .argument('<schema>', 'Path to schema file')
    .option('-a, --adapter <name>', 'Adapter override')
    .option('-o, --output <path>', 'Output directory (default: colocation)')
    .action(async (schemaPath, options) => {
    try {
        logger_1.logger.info('Starting generation...');
        // FR-006: Resolve Config or Fallback
        let config = {};
        try {
            // Assuming loadConfig throws if not found? Or returns empty?
            // For P1, we assume loadConfig logic exists or we handle missing
            config = await (0, core_1.loadConfig)(process.cwd());
        }
        catch (e) {
            logger_1.logger.warn('zo.config.json not found. Falling back to default adapter.');
            config = { adapter: '@zo-ui/adapter-shadcn' };
        }
        // Override config with CLI options
        if (options.adapter)
            config.adapter = options.adapter;
        // T015: Fallback Logic
        if (!config.adapter)
            config.adapter = '@zo-ui/adapter-shadcn';
        // Resolve Adapter (US2: Dynamic Loading. US1: Hardcoded switch or dynamic import if local)
        // For US1 we only support Shadcn
        let adapter;
        if (config.adapter === '@zo-ui/adapter-shadcn' || config.adapter === 'shadcn-svelte') {
            adapter = adapter_shadcn_1.ShadcnAdapter;
        }
        else {
            throw new Error(`Adapter ${config.adapter} not supported yet in MVP.`);
        }
        // Load Schemas
        const schemas = await (0, core_1.loadSchema)(schemaPath, process.cwd());
        if (Object.keys(schemas).length === 0) {
            logger_1.logger.warn('No schemas found in file.');
            return;
        }
        logger_1.logger.info(`Using adapter: ${adapter.name} v${adapter.version}`);
        // Process Schemas
        for (const [name, schema] of Object.entries(schemas)) {
            logger_1.logger.info(`Processing schema: ${name}`);
            // 1. Resolve to UI Tree
            const uiTree = core_1.SchemaResolver.resolve(schema, { schemaName: name });
            // 2. Generate Files (Adapter)
            // Adapter returns GeneratedFile[]
            const generatedFiles = await adapter.generate(uiTree);
            // 3. Write Files (Atomic)
            // FR-007 Colocation: if options.output not set, use schema dir
            const targetDir = options.output
                ? (0, path_1.resolve)(process.cwd(), options.output)
                : (0, path_1.resolve)(process.cwd(), (0, path_1.resolve)(schemaPath, '..')); // colocation
            await core_1.FileWriter.writeFiles(generatedFiles, targetDir);
            logger_1.logger.success(`Generated ${generatedFiles.length} files for ${name}`);
        }
        logger_1.logger.success('All tasks complete.');
    }
    catch (err) {
        logger_1.logger.error(`Generation failed: ${err.message}`);
        process.exit(1);
    }
});
//# sourceMappingURL=generate.js.map