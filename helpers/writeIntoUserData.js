import fs from 'fs/promises';

export const writeIntoUsersData = async(path, data) => {
    return await fs.writeFile(path, JSON.stringify(data, null, 4));
}