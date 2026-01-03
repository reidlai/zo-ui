"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWriter = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class FileWriter {
    /**
     * Atomically writes generated files to disk.
     * Note: "Atomic" here effectively means we attempt to write all, and if any fail,
     * we attempt to rollback (delete) those we just wrote during this session.
     *
     * @param files List of files to write
     * @param targetDir Base directory to write to
     */
    static async writeFiles(files, targetDir) {
        const writtenPaths = [];
        try {
            for (const file of files) {
                const fullPath = (0, path_1.resolve)(targetDir, file.filename);
                // Ensure dir exists
                await fs_1.promises.mkdir((0, path_1.dirname)(fullPath), { recursive: true });
                await fs_1.promises.writeFile(fullPath, file.content, 'utf-8');
                writtenPaths.push(fullPath);
                // console.log(`Written: ${fullPath}`);
            }
        }
        catch (error) {
            console.error("Write error occurred. Rolling back...");
            // Rollback
            await Promise.all(writtenPaths.map(p => fs_1.promises.unlink(p).catch(() => { })));
            throw error;
        }
    }
}
exports.FileWriter = FileWriter;
//# sourceMappingURL=FileWriter.js.map