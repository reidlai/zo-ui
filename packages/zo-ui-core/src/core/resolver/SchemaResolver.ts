
import { z } from 'zod';
import { UITree } from '@zo-ui/types';
import { ZodVisitor } from './Visitor';

export interface ResolverOptions {
    overrides?: Record<string, string>; // zodType -> componentId
    schemaName?: string;
}

export class SchemaResolver {

    /**
     * Resolves a Zod Schema into a UI Tree.
     * (FR-013)
     */
    static resolve(schema: z.ZodType, options: ResolverOptions = {}): UITree {
        // Pass overrides to Visitor
        const visitor = new ZodVisitor(options.overrides || {});

        const rootNode = visitor.visit(schema, 'root');

        return {
            root: rootNode,
            originalSchema: schema,
            schemaName: options.schemaName
        };
    }
}
