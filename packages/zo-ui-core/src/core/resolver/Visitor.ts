
import { z } from 'zod';
import { UINode, ComponentNode, ContainerNode } from '@zo-ui/types';
import { DefaultMapping } from './DefaultMapping';

export class ZodVisitor {
    private overrides: Record<string, string>;

    constructor(overrides: Record<string, string> = {}) {
        this.overrides = overrides;
    }

    visit(schema: z.ZodType, fieldName: string, isRequired: boolean = true): UINode {
        if (schema instanceof z.ZodObject) {
            return this.visitObject(schema, fieldName, isRequired);
        }

        // Handle optional wrapper
        if (schema instanceof z.ZodOptional) {
            return this.visit(schema.unwrap(), fieldName, false);
        }

        // Handle effects (refinements, transforms) - unwrap to underlying type
        if (schema instanceof z.ZodEffects) {
            return this.visit(schema._def.schema, fieldName, isRequired);
        }

        // Default: Treat as Component
        return this.visitComponent(schema, fieldName, isRequired);
    }

    private visitObject(schema: z.ZodObject<any>, fieldName: string, isRequired: boolean): ContainerNode {
        const shape = schema.shape;
        const children: UINode[] = [];

        for (const [key, subSchema] of Object.entries(shape)) {
            children.push(this.visit(subSchema as z.ZodType, key));
        }

        return {
            type: 'container',
            fieldName,
            isRequired,
            description: schema.description,
            children
        };
    }

    private visitComponent(schema: z.ZodType, fieldName: string, isRequired: boolean): ComponentNode {
        const zodType = schema.constructor.name;

        // Priority 1: Metadata (.describe("ui:id"))
        let componentId = this.parseMetadata(schema.description);

        // Priority 2: Config Overrides
        if (!componentId && this.overrides[zodType]) {
            componentId = this.overrides[zodType];
        }

        // Priority 3: Default Mapping
        if (!componentId) {
            componentId = DefaultMapping.get(zodType);
        }

        return {
            type: 'component',
            fieldName,
            isRequired,
            description: schema.description,
            componentId,
            zodType,
            metadata: {} // Populated in US2
        };
    }

    private parseMetadata(description?: string): string | undefined {
        if (!description) return undefined;
        // FR-003 Syntax: "ui:<id>"
        const match = description.match(/ui:([a-zA-Z0-9-]+)/);
        return match ? match[1] : undefined;
    }
}
