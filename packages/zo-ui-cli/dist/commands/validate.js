"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommand = void 0;
const commander_1 = require("commander");
const core_1 = require("@zo-ui/core");
const logger_1 = require("../logger");
exports.validateCommand = new commander_1.Command('validate')
    .description('Validate schema file')
    .argument('<path>', 'Path to schema file')
    .action(async (path) => {
    try {
        logger_1.logger.info(`Validating schema at ${path}...`);
        const schemas = await (0, core_1.loadSchema)(path, process.cwd());
        const count = Object.keys(schemas).length;
        if (count === 0) {
            logger_1.logger.warn('No schemas found.');
        }
        else {
            logger_1.logger.success(`Found ${count} valid Zod schemas.`);
            for (const [name, schema] of Object.entries(schemas)) {
                const info = (0, core_1.parseSchema)(name, schema);
                logger_1.logger.info(`- ${name}: ${info.fields.length} fields`);
            }
        }
    }
    catch (err) {
        logger_1.logger.error(`Validation failed: ${err.message}`);
        process.exit(1);
    }
});
//# sourceMappingURL=validate.js.map