"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSchema = parseSchema;
const zod_to_json_schema_1 = require("zod-to-json-schema");
function parseSchema(name, schema) {
    const jsonSchema = (0, zod_to_json_schema_1.zodToJsonSchema)(schema, name);
    // Basic parsing of JSON schema to FieldInfo
    // This is a simplified implementation. Real world would need recursive parsing.
    const fields = [];
    let targetSchema = jsonSchema;
    if (targetSchema.definitions && targetSchema.$ref) {
        const ref = targetSchema.$ref.replace('#/definitions/', '');
        if (targetSchema.definitions[ref]) {
            targetSchema = targetSchema.definitions[ref];
        }
    }
    if (targetSchema && typeof targetSchema === 'object' && 'properties' in targetSchema) {
        const properties = targetSchema.properties || {};
        const required = targetSchema.required || [];
        for (const [fieldName, def] of Object.entries(properties)) {
            const fieldDef = def;
            fields.push({
                name: fieldName,
                type: mapJsonTypeToTsType(fieldDef),
                optional: !required.includes(fieldName),
                description: fieldDef.description,
                metadata: fieldDef
            });
        }
    }
    return {
        name,
        schema,
        fields
    };
}
function mapJsonTypeToTsType(def) {
    if (def.type === 'string')
        return 'string';
    if (def.type === 'number' || def.type === 'integer')
        return 'number';
    if (def.type === 'boolean')
        return 'boolean';
    if (def.type === 'array')
        return 'any[]'; // Simplify for now
    if (def.type === 'object')
        return 'object';
    return 'any';
}
//# sourceMappingURL=parser.js.map