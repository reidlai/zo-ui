export interface ZoConfig {
    schemaPath?: string;
    adapter?: string;
    outputDir?: string;
    overrides?: Record<string, string>;
}
export declare class ConfigLoader {
    static load(cwd?: string): Promise<ZoConfig>;
}
//# sourceMappingURL=ConfigLoader.d.ts.map