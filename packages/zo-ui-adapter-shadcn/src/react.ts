import type { Adapter, SchemaInfo, GeneratorOptions } from '@zo-ui/core';

export class ShadcnReactAdapter implements Adapter {
    name = '@zo-ui/adapter-shadcn-react';

    async generate(schema: SchemaInfo, options: GeneratorOptions): Promise<void> {
        console.log(`Generating React components for ${schema.name}... (Not implemented)`);
    }
}
