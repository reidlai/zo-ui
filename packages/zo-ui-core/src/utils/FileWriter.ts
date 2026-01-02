
import { GeneratedFile } from '@zo-ui/types';
import { promises as fs } from 'fs';
import { resolve, dirname } from 'path';

export class FileWriter {
    /**
     * Atomically writes generated files to disk.
     * Note: "Atomic" here effectively means we attempt to write all, and if any fail,
     * we attempt to rollback (delete) those we just wrote during this session.
     * 
     * @param files List of files to write
     * @param targetDir Base directory to write to
     */
    static async writeFiles(files: GeneratedFile[], targetDir: string): Promise<void> {
        const writtenPaths: string[] = [];

        try {
            for (const file of files) {
                const fullPath = resolve(targetDir, file.filename);
                // Ensure dir exists
                await fs.mkdir(dirname(fullPath), { recursive: true });

                await fs.writeFile(fullPath, file.content, 'utf-8');
                writtenPaths.push(fullPath);
                // console.log(`Written: ${fullPath}`);
            }
        } catch (error) {
            console.error("Write error occurred. Rolling back...");
            // Rollback
            await Promise.all(writtenPaths.map(p => fs.unlink(p).catch(() => { })));
            throw error;
        }
    }
}
