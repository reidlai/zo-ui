"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentResolver = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
class ComponentResolver {
    components = {};
    defaultAlias = '$lib/components/ui';
    constructor(cwd = process.cwd()) {
        this.loadComponentsJson(cwd);
    }
    loadComponentsJson(cwd) {
        const path = (0, path_1.resolve)(cwd, 'components.json');
        if ((0, fs_1.existsSync)(path)) {
            try {
                const content = JSON.parse((0, fs_1.readFileSync)(path, 'utf-8'));
                // Parse aliases or aliases.components
                if (content.aliases?.components) {
                    this.defaultAlias = content.aliases.components;
                }
                // Additional mapping logic found in components.json
            }
            catch (e) {
                // failed to load
            }
        }
    }
    resolve(componentName) {
        // Basic resolution: lowercase-dash-case
        // Input -> input
        // Select -> select
        const fileName = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        return `${this.defaultAlias}/${fileName}`;
    }
}
exports.ComponentResolver = ComponentResolver;
//# sourceMappingURL=resolver.js.map