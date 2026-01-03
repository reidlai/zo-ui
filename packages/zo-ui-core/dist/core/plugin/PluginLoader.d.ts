import { AdapterPlugin } from '@zo-ui/types';
export declare class PluginLoader {
    /**
     * Dynamically loads an adapter plugin.
     * Supports NPM package references or local file paths.
     */
    static load(adapterNameOrPath: string, cwd?: string): Promise<AdapterPlugin>;
    private static isValidPlugin;
}
//# sourceMappingURL=PluginLoader.d.ts.map