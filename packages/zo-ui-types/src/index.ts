/**
 * @zo-ui/types - Plugin Interface Definition
 * This file defines the contract that all external adapters MUST implement.
 */

import { z } from 'zod';

// --- UI Tree Definitions (The Input) ---

export type UINodeType = 'component' | 'container';

export interface BaseNode {
    type: UINodeType;
    fieldName: string;
    description?: string;
    isRequired: boolean;
}

export interface ComponentNode extends BaseNode {
    type: 'component';
    componentId: string; // e.g., 'input-text', 'datepicker'
    zodType: string;     // e.g., 'ZodString', 'ZodNumber'
    defaultValue?: any;
    metadata: Record<string, any>; // any extra hints
}

export interface ContainerNode extends BaseNode {
    type: 'container';
    children: UINode[]; // Ordered list of children
}

export type UINode = ComponentNode | ContainerNode;

export interface UITree {
    root: UINode;
    originalSchema: z.ZodType; // Reference to original if needed
    schemaName?: string; // e.g. "UserSchema"
}

// --- Generator Definitions (The Output) ---

export interface GeneratedFile {
    filename: string;
    content: string;
}

// --- The Plugin Interface ---

export interface AdapterPlugin {
    /**
     * Unique name of the adapter (e.g., "shadcn-svelte")
     */
    name: string;

    /**
     * Semantic version of the adapter
     */
    version: string;

    /**
     * Primary generation entry point.
     * Receives the fully resolved UI Tree and produces file contents.
     */
    generate(tree: UITree): Promise<GeneratedFile[]>;

    /**
     * Returns a list of supported Component IDs for documentation generation.
     */
    getComponentList(): string[];
}
