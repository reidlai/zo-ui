import { GeneratedFile } from '@zo-ui/types';
export declare class FileWriter {
    /**
     * Atomically writes generated files to disk.
     * Note: "Atomic" here effectively means we attempt to write all, and if any fail,
     * we attempt to rollback (delete) those we just wrote during this session.
     *
     * @param files List of files to write
     * @param targetDir Base directory to write to
     */
    static writeFiles(files: GeneratedFile[], targetDir: string): Promise<void>;
}
//# sourceMappingURL=FileWriter.d.ts.map