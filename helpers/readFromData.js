import fs from 'fs/promises';

export const readFromData = async(path) => {
    return await fs.readFile(path, 'utf-8');
}