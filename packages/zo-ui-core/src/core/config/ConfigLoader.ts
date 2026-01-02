
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

export interface ZoConfig {
    schemaPath?: string;
    adapter?: string; // npm package or local path
    outputDir?: string;
    overrides?: Record<string, string>; // zodType -> componentId
}

export class ConfigLoader {
    static async load(cwd: string = process.cwd()): Promise<ZoConfig> {
        const configPath = resolve(cwd, 'zo.config.json');
        if (!existsSync(configPath)) {
            // FR-006: Missing config implies default behavior (caller handles fallback warnings)
            return {};
        }

        try {
            const content = readFileSync(configPath, 'utf-8');
            return JSON.parse(content) as ZoConfig;
        } catch (error) {
            console.warn('Failed to parse zo.config.json. Using defaults.', error);
            return {};
        }
    }
}
