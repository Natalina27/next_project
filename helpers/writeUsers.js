import fs from 'fs/promises'

export const writeUsers = async(users) => {
     await fs.writeFile(`./data/users.json`, JSON.stringify(users, null, 4));
}