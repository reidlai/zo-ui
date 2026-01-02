import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import type { Config } from './types';

export const DEFAULT_CONFIG: Config = {
    schemaPath: 'schema.ts',
    adapter: '@zo-ui/adapter-shadcn',
    outputDir: 'src/lib/components/zo',
};

export async function loadConfig(cwd: string = process.cwd(), cliOptions: Partial<Config> = {}): Promise<Config> {
    let fileConfig: Partial<Config> = {};

    const configPath = resolve(cwd, 'zo.config.json');
    if (existsSync(configPath)) {
        try {
            const content = readFileSync(configPath, 'utf-8');
            fileConfig = JSON.parse(content);
        } catch (error) {
            console.warn('Failed to parse zo.config.json', error);
        }
    }

    // Env vars
    const envConfig: Partial<Config> = {
        schemaPath: process.env.ZO_SCHEMA_PATH,
        adapter: process.env.ZO_ADAPTER,
        outputDir: process.env.ZO_OUTPUT_DIR,
    };

    // Remove undefined env vars
    Object.keys(envConfig).forEach(key => envConfig[key as keyof Config] === undefined && delete envConfig[key as keyof Config]);

    return {
        ...DEFAULT_CONFIG,
        ...fileConfig,
        ...envConfig,
        ...cliOptions,
    };
}
