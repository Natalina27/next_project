import fs from "fs/promises";

export const writeIntoUsersData = (path, data) => {
    return fs.writeFile(path, JSON.stringify(data, null, 4));
}