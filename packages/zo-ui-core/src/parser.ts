import { zodToJsonSchema } from 'zod-to-json-schema';
import type { ZodSchema } from 'zod';
import type { SchemaInfo, FieldInfo } from './types';

export function parseSchema(name: string, schema: ZodSchema): SchemaInfo {
    const jsonSchema = zodToJsonSchema(schema, name);

    // Basic parsing of JSON schema to FieldInfo
    // This is a simplified implementation. Real world would need recursive parsing.
    const fields: FieldInfo[] = [];

    let targetSchema = jsonSchema as any;
    if (targetSchema.definitions && targetSchema.$ref) {
        const ref = targetSchema.$ref.replace('#/definitions/', '');
        if (targetSchema.definitions[ref]) {
            targetSchema = targetSchema.definitions[ref];
        }
    }

    if (targetSchema && typeof targetSchema === 'object' && 'properties' in targetSchema) {
        const properties = (targetSchema as any).properties || {};
        const required = (targetSchema as any).required || [];

        for (const [fieldName, def] of Object.entries(properties)) {
            const fieldDef = def as any;
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

function mapJsonTypeToTsType(def: any): string {
    if (def.type === 'string') return 'string';
    if (def.type === 'number' || def.type === 'integer') return 'number';
    if (def.type === 'boolean') return 'boolean';
    if (def.type === 'array') return 'any[]'; // Simplify for now
    if (def.type === 'object') return 'object';
    return 'any';
}
