"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodVisitor = void 0;
const zod_1 = require("zod");
const DefaultMapping_1 = require("./DefaultMapping");
class ZodVisitor {
    overrides;
    constructor(overrides = {}) {
        this.overrides = overrides;
    }
    visit(schema, fieldName, isRequired = true) {
        if (schema instanceof zod_1.z.ZodObject) {
            return this.visitObject(schema, fieldName, isRequired);
        }
        // Handle optional wrapper
        if (schema instanceof zod_1.z.ZodOptional) {
            return this.visit(schema.unwrap(), fieldName, false);
        }
        // Handle effects (refinements, transforms) - unwrap to underlying type
        if (schema instanceof zod_1.z.ZodEffects) {
            return this.visit(schema._def.schema, fieldName, isRequired);
        }
        // Default: Treat as Component
        return this.visitComponent(schema, fieldName, isRequired);
    }
    visitObject(schema, fieldName, isRequired) {
        const shape = schema.shape;
        const children = [];
        for (const [key, subSchema] of Object.entries(shape)) {
            children.push(this.visit(subSchema, key));
        }
        return {
            type: 'container',
            fieldName,
            isRequired,
            description: schema.description,
            children
        };
    }
    visitComponent(schema, fieldName, isRequired) {
        const zodType = schema.constructor.name;
        // Priority 1: Metadata (.describe("ui:id"))
        let componentId = this.parseMetadata(schema.description);
        // Priority 2: Config Overrides
        if (!componentId && this.overrides[zodType]) {
            componentId = this.overrides[zodType];
        }
        // Priority 3: Default Mapping
        if (!componentId) {
            componentId = DefaultMapping_1.DefaultMapping.get(zodType);
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
    parseMetadata(description) {
        if (!description)
            return undefined;
        // FR-003 Syntax: "ui:<id>"
        const match = description.match(/ui:([a-zA-Z0-9-]+)/);
        return match ? match[1] : undefined;
    }
}
exports.ZodVisitor = ZodVisitor;
//# sourceMappingURL=Visitor.js.map