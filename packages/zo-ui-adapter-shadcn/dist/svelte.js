"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadcnSvelteAdapter = void 0;
const input_1 = require("./generators/svelte/input");
const form_1 = require("./generators/svelte/form");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ShadcnSvelteAdapter {
    name = '@zo-ui/adapter-shadcn-svelte';
    async generate(schema, options) {
        console.log(`Generating Svelte 5 components for ${schema.name} in ${options.outputDir}...`);
        // const resolver = new ComponentResolver(process.cwd());
        const fieldsContent = [];
        for (const field of schema.fields) {
            let content = '';
            if (field.metadata?.hidden)
                continue;
            switch (field.type) {
                case 'string':
                    if (field.metadata?.format === 'textarea' || (field.metadata?.maxLength && field.metadata.maxLength > 100)) {
                        content = (0, input_1.generateTextarea)(field);
                    }
                    else {
                        content = (0, input_1.generateInput)(field);
                    }
                    break;
                case 'number':
                    content = (0, input_1.generateInput)(field);
                    break;
                // ... more types
                default:
                    content = (0, input_1.generateInput)(field);
            }
            fieldsContent.push(content);
        }
        const formContent = (0, form_1.generateForm)(fieldsContent.join('\n'), schema.name);
        const outputPath = path.resolve(options.outputDir, `${schema.name}Form.svelte`);
        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }
        fs.writeFileSync(outputPath, formContent);
        console.log(`Generated ${outputPath}`);
    }
}
exports.ShadcnSvelteAdapter = ShadcnSvelteAdapter;
//# sourceMappingURL=svelte.js.map