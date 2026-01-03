"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const zod_1 = require("zod");
const parser_1 = require("../parser");
(0, vitest_1.describe)('SchemaParser', () => {
    (0, vitest_1.it)('should parse a simple string field', () => {
        const schema = zod_1.z.string().describe('A simple string');
        const result = (0, parser_1.parseSchema)('testField', schema);
        (0, vitest_1.expect)(result.name).toBe('testField');
        (0, vitest_1.expect)(result.fields).toHaveLength(0); // Since input is a scalar, simple implementation might not produce fields unless it's an object
        // Wait, my implementation iterates 'properties' of an object.
        // If I pass a ZodString, it won't have properties.
        // I should test ZodObject.
    });
    (0, vitest_1.it)('should parse a ZodObject', () => {
        const schema = zod_1.z.object({
            name: zod_1.z.string(),
            age: zod_1.z.number().optional(),
            isActive: zod_1.z.boolean().default(true),
        });
        const result = (0, parser_1.parseSchema)('User', schema);
        (0, vitest_1.expect)(result.name).toBe('User');
        (0, vitest_1.expect)(result.fields).toHaveLength(3);
        const nameField = result.fields.find(f => f.name === 'name');
        (0, vitest_1.expect)(nameField).toBeDefined();
        (0, vitest_1.expect)(nameField?.type).toBe('string');
        (0, vitest_1.expect)(nameField?.optional).toBe(false);
        const ageField = result.fields.find(f => f.name === 'age');
        (0, vitest_1.expect)(ageField).toBeDefined();
        (0, vitest_1.expect)(ageField?.type).toBe('number');
        (0, vitest_1.expect)(ageField?.optional).toBe(true);
        const activeField = result.fields.find(f => f.name === 'isActive');
        (0, vitest_1.expect)(activeField).toBeDefined();
        (0, vitest_1.expect)(activeField?.type).toBe('boolean');
    });
});
//# sourceMappingURL=parser.test.js.map