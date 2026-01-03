import { z } from 'zod';
import { UITree } from '@zo-ui/types';
export interface ResolverOptions {
    overrides?: Record<string, string>;
    schemaName?: string;
}
export declare class SchemaResolver {
    /**
     * Resolves a Zod Schema into a UI Tree.
     * (FR-013)
     */
    static resolve(schema: z.ZodType, options?: ResolverOptions): UITree;
}
//# sourceMappingURL=SchemaResolver.d.ts.map