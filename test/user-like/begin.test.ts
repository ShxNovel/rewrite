import * as fs from "fs";
import * as path from "path";

import { assert, expect, test, vi } from "vitest";
import * as file from "../../src/core/rewrite.ts";

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

const allFiles = getAllFiles("./test/user-like/files");
const filesMap = allFiles.map((file) => {
    const resolvedPath = path.resolve(file);
    return resolvedPath;
});

test("some", async () => {
    let i = 0;
    for (const one of filesMap) {
        file.rewriteBegin(path.basename(one), allFiles[i]);
        await import(one);
        file.rewriteEnd();
        i++;
    }

    const result = file.RewriteFiles;
    // expect(result).toMatchSnapshot();
});
