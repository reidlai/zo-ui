import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { parseSchema } from '../parser';

describe('SchemaParser', () => {
    it('should parse a simple string field', () => {
        const schema = z.string().describe('A simple string');
        const result = parseSchema('testField', schema);

        expect(result.name).toBe('testField');
        expect(result.fields).toHaveLength(0); // Since input is a scalar, simple implementation might not produce fields unless it's an object
        // Wait, my implementation iterates 'properties' of an object.
        // If I pass a ZodString, it won't have properties.
        // I should test ZodObject.
    });

    it('should parse a ZodObject', () => {
        const schema = z.object({
            name: z.string(),
            age: z.number().optional(),
            isActive: z.boolean().default(true),
        });

        const result = parseSchema('User', schema);

        expect(result.name).toBe('User');
        expect(result.fields).toHaveLength(3);

        const nameField = result.fields.find(f => f.name === 'name');
        expect(nameField).toBeDefined();
        expect(nameField?.type).toBe('string');
        expect(nameField?.optional).toBe(false);

        const ageField = result.fields.find(f => f.name === 'age');
        expect(ageField).toBeDefined();
        expect(ageField?.type).toBe('number');
        expect(ageField?.optional).toBe(true);

        const activeField = result.fields.find(f => f.name === 'isActive');
        expect(activeField).toBeDefined();
        expect(activeField?.type).toBe('boolean');
    });
});
