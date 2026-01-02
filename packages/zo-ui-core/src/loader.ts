import { createJiti } from 'jiti';
import { resolve } from 'path';
import { existsSync } from 'fs';
import type { ZodSchema } from 'zod';

export interface LoadedSchemas {
    [key: string]: ZodSchema;
}

export async function loadSchema(path: string, cwd: string = process.cwd()): Promise<LoadedSchemas> {
    const fullPath = resolve(cwd, path);
    if (!existsSync(fullPath)) {
        throw new Error(`Schema file not found at ${fullPath}`);
    }

    const jiti = createJiti(cwd);
    const exports = await jiti.import(fullPath) as Record<string, any>;

    const schemas: LoadedSchemas = {};

    for (const [key, value] of Object.entries(exports)) {
        if (isZodSchema(value)) {
            schemas[key] = value;
        }
    }

    return schemas;
}

function isZodSchema(value: any): value is ZodSchema {
    return value && typeof value === 'object' && '_def' in value; // Basic Zod check
}
