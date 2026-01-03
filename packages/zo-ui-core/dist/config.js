"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = void 0;
exports.loadConfig = loadConfig;
const fs_1 = require("fs");
const path_1 = require("path");
exports.DEFAULT_CONFIG = {
    schemaPath: 'schema.ts',
    adapter: '@zo-ui/adapter-shadcn',
    outputDir: 'src/lib/components/zo',
};
async function loadConfig(cwd = process.cwd(), cliOptions = {}) {
    let fileConfig = {};
    const configPath = (0, path_1.resolve)(cwd, 'zo.config.json');
    if ((0, fs_1.existsSync)(configPath)) {
        try {
            const content = (0, fs_1.readFileSync)(configPath, 'utf-8');
            fileConfig = JSON.parse(content);
        }
        catch (error) {
            console.warn('Failed to parse zo.config.json', error);
        }
    }
    // Env vars
    const envConfig = {
        schemaPath: process.env.ZO_SCHEMA_PATH,
        adapter: process.env.ZO_ADAPTER,
        outputDir: process.env.ZO_OUTPUT_DIR,
    };
    // Remove undefined env vars
    Object.keys(envConfig).forEach(key => envConfig[key] === undefined && delete envConfig[key]);
    return {
        ...exports.DEFAULT_CONFIG,
        ...fileConfig,
        ...envConfig,
        ...cliOptions,
    };
}
//# sourceMappingURL=config.js.map