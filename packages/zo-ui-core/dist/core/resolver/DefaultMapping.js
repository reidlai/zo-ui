"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMapping = void 0;
/**
 * Default Mapping Registry (FR-001)
 * Maps Standard Zod Types to UI Component IDs.
 */
class DefaultMapping {
    static mapping = new Map([
        ['ZodString', 'input-text'],
        ['ZodNumber', 'input-number'],
        ['ZodBoolean', 'switch'],
        ['ZodDate', 'datepicker'],
        ['ZodEnum', 'select'],
    ]);
    /**
     * Resolve a default component ID for a given Zod Type.
     */
    static get(zodType) {
        return this.mapping.get(zodType) || 'input-text'; // Metric SC-003
    }
}
exports.DefaultMapping = DefaultMapping;
//# sourceMappingURL=DefaultMapping.js.map