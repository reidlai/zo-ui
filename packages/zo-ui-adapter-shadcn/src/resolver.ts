import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

export class ComponentResolver {
    private components: Record<string, string> = {};
    private defaultAlias = '$lib/components/ui';

    constructor(cwd: string = process.cwd()) {
        this.loadComponentsJson(cwd);
    }

    private loadComponentsJson(cwd: string) {
        const path = resolve(cwd, 'components.json');
        if (existsSync(path)) {
            try {
                const content = JSON.parse(readFileSync(path, 'utf-8'));
                // Parse aliases or aliases.components
                if (content.aliases?.components) {
                    this.defaultAlias = content.aliases.components;
                }
                // Additional mapping logic found in components.json
            } catch (e) {
                // failed to load
            }
        }
    }

    resolve(componentName: string): string {
        // Basic resolution: lowercase-dash-case
        // Input -> input
        // Select -> select
        const fileName = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        return `${this.defaultAlias}/${fileName}`;
    }
}
