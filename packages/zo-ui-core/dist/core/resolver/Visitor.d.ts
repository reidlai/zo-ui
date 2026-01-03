import { z } from 'zod';
import { UINode } from '@zo-ui/types';
export declare class ZodVisitor {
    private overrides;
    constructor(overrides?: Record<string, string>);
    visit(schema: z.ZodType, fieldName: string, isRequired?: boolean): UINode;
    private visitObject;
    private visitComponent;
    private parseMetadata;
}
//# sourceMappingURL=Visitor.d.ts.map