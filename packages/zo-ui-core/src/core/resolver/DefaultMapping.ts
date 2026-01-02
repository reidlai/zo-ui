
import { z } from 'zod';
import { ComponentNode } from '@zo-ui/types';

/**
 * Default Mapping Registry (FR-001)
 * Maps Standard Zod Types to UI Component IDs.
 */
export class DefaultMapping {
    private static mapping: Map<string, string> = new Map([
        ['ZodString', 'input-text'],
        ['ZodNumber', 'input-number'],
        ['ZodBoolean', 'switch'],
        ['ZodDate', 'datepicker'],
        ['ZodEnum', 'select'],
    ]);

    /**
     * Resolve a default component ID for a given Zod Type.
     */
    static get(zodType: string): string {
        return this.mapping.get(zodType) || 'input-text'; // Metric SC-003
    }
}
