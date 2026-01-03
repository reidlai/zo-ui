import type { ZodSchema } from 'zod';
export interface LoadedSchemas {
    [key: string]: ZodSchema;
}
export declare function loadSchema(path: string, cwd?: string): Promise<LoadedSchemas>;
//# sourceMappingURL=loader.d.ts.map