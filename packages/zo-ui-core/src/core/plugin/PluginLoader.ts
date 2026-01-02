
import { AdapterPlugin } from '@zo-ui/types';
import { pathToFileURL } from 'url';
import { resolve, isAbsolute } from 'path';

export class PluginLoader {
    /**
     * Dynamically loads an adapter plugin.
     * Supports NPM package references or local file paths.
     */
    static async load(adapterNameOrPath: string, cwd: string = process.cwd()): Promise<AdapterPlugin> {
        let importPath = adapterNameOrPath;

        // Check if it's a local file (starts with . or / or is absolute)
        if (adapterNameOrPath.startsWith('.') || adapterNameOrPath.startsWith('/') || isAbsolute(adapterNameOrPath)) {
            const resolvedPath = resolve(cwd, adapterNameOrPath);
            // Convert to file URL for Windows/ESM compatibility (Research Task 2)
            importPath = pathToFileURL(resolvedPath).href;
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

            return plugin as AdapterPlugin;
        } catch (error: any) {
            throw new Error(`Failed to load adapter '${adapterNameOrPath}': ${error.message}`);
        }
    }

    private static isValidPlugin(plugin: any): boolean {
        return typeof plugin === 'object'
            && typeof plugin.name === 'string'
            && typeof plugin.version === 'string'
            && typeof plugin.generate === 'function';
    }
}
