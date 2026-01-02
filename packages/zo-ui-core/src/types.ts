import type { ZodSchema } from 'zod';

export interface FieldInfo {
  name: string;
  type: string;
  optional: boolean;
  description?: string;
  metadata?: Record<string, any>;
}

export interface SchemaInfo {
  name: string;
  schema: ZodSchema;
  fields: FieldInfo[];
}

export interface GeneratorOptions {
  adapter: string;
  outputDir: string;
  force?: boolean;
}

export interface Adapter {
  name: string;
  generate(schema: SchemaInfo, options: GeneratorOptions): Promise<void>;
}

export interface Config {
  schemaPath: string;
  adapter: string;
  outputDir: string;
  components?: Record<string, string>;
}
