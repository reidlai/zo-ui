"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptForConfig = promptForConfig;
const inquirer_1 = __importDefault(require("inquirer"));
async function promptForConfig(current) {
    const answers = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'schemaPath',
            message: 'Path to schema file:',
            default: current.schemaPath || 'schema.ts',
            when: !current.schemaPath
        },
        {
            type: 'list',
            name: 'adapter',
            message: 'Choose adapter:',
            choices: ['shadcn-svelte', 'tailwind'],
            default: current.adapter || 'shadcn-svelte',
            when: !current.adapter
        },
        {
            type: 'input',
            name: 'outputDir',
            message: 'Output directory:',
            default: current.outputDir || 'src/lib/components',
            when: !current.outputDir
        }
    ]);
    return { ...current, ...answers };
}
//# sourceMappingURL=prompts.js.map