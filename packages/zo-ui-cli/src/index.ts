#!/usr/bin/env node
import { Command } from 'commander';
import { generateCommand } from './commands/generate';
import { validateCommand } from './commands/validate';

const program = new Command();

program
    .name('zo-ui')
    .description('Scaffold generator for zo-ui')
    .version('0.0.1');

program.addCommand(generateCommand);
program.addCommand(validateCommand);

program.parse();
