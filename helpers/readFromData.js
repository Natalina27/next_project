import fs from "fs/promises";

export const readFromData = (path) => {
    return fs.readFile(path, 'utf-8');
}