"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSchema = loadSchema;
const jiti_1 = require("jiti");
const path_1 = require("path");
const fs_1 = require("fs");
async function loadSchema(path, cwd = process.cwd()) {
    const fullPath = (0, path_1.resolve)(cwd, path);
    if (!(0, fs_1.existsSync)(fullPath)) {
        throw new Error(`Schema file not found at ${fullPath}`);
    }
    const jiti = (0, jiti_1.createJiti)(cwd);
    const exports = await jiti.import(fullPath);
    const schemas = {};
    for (const [key, value] of Object.entries(exports)) {
        if (isZodSchema(value)) {
            schemas[key] = value;
        }
    }
    return schemas;
}
function isZodSchema(value) {
    return value && typeof value === 'object' && '_def' in value; // Basic Zod check
}
//# sourceMappingURL=loader.js.map