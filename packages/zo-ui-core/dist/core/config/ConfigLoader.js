"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigLoader = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class ConfigLoader {
    static async load(cwd = process.cwd()) {
        const configPath = (0, path_1.resolve)(cwd, 'zo.config.json');
        if (!(0, fs_1.existsSync)(configPath)) {
            // FR-006: Missing config implies default behavior (caller handles fallback warnings)
            return {};
        }
        try {
            const content = (0, fs_1.readFileSync)(configPath, 'utf-8');
            return JSON.parse(content);
        }
        catch (error) {
            console.warn('Failed to parse zo.config.json. Using defaults.', error);
            return {};
        }
    }
}
exports.ConfigLoader = ConfigLoader;
//# sourceMappingURL=ConfigLoader.js.map