#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generate_1 = require("./commands/generate");
const validate_1 = require("./commands/validate");
const docs_1 = require("./commands/docs");
const program = new commander_1.Command();
program
    .name('zo-ui')
    .description('Scaffold generator for zo-ui')
    .version('0.0.1');
program.addCommand(generate_1.generateCommand);
program.addCommand(validate_1.validateCommand);
program.addCommand(docs_1.docsCommand);
program.parse();
//# sourceMappingURL=index.js.map