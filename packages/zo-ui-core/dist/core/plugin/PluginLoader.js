"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginLoader = void 0;
const url_1 = require("url");
const path_1 = require("path");
class PluginLoader {
    /**
     * Dynamically loads an adapter plugin.
     * Supports NPM package references or local file paths.
     */
    static async load(adapterNameOrPath, cwd = process.cwd()) {
        let importPath = adapterNameOrPath;
        // Check if it's a local file (starts with . or / or is absolute)
        if (adapterNameOrPath.startsWith('.') || adapterNameOrPath.startsWith('/') || (0, path_1.isAbsolute)(adapterNameOrPath)) {
            const resolvedPath = (0, path_1.resolve)(cwd, adapterNameOrPath);
            // Convert to file URL for Windows/ESM compatibility (Research Task 2)
            importPath = (0, url_1.pathToFileURL)(resolvedPath).href;
        }
        try {
            // Dynamic Import
            const module = await import(importPath);
            // Check for default export or named 'adapter' or purely module if CJS
            const plugin = module.default || module.adapter || module;
            // Type Guard / Validation (FR-011)
            if (!this.isValidPlugin(plugin)) {
                throw new Error(`Module ${adapterNameOrPath} does not implement AdapterPlugin interface.`);
            }
            return plugin;
        }
        catch (error) {
            throw new Error(`Failed to load adapter '${adapterNameOrPath}': ${error.message}`);
        }
    }
    static isValidPlugin(plugin) {
        return typeof plugin === 'object'
            && typeof plugin.name === 'string'
            && typeof plugin.version === 'string'
            && typeof plugin.generate === 'function';
    }
}
exports.PluginLoader = PluginLoader;
//# sourceMappingURL=PluginLoader.js.map