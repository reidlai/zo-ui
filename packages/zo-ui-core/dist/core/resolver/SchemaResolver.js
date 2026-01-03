"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaResolver = void 0;
const Visitor_1 = require("./Visitor");
class SchemaResolver {
    /**
     * Resolves a Zod Schema into a UI Tree.
     * (FR-013)
     */
    static resolve(schema, options = {}) {
        // Pass overrides to Visitor
        const visitor = new Visitor_1.ZodVisitor(options.overrides || {});
        const rootNode = visitor.visit(schema, 'root');
        return {
            root: rootNode,
            originalSchema: schema,
            schemaName: options.schemaName
        };
    }
}
exports.SchemaResolver = SchemaResolver;
//# sourceMappingURL=SchemaResolver.js.map