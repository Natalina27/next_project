import fs from 'fs/promises'

export default async function writeUser(users) {
    await fs.writeFile(`./data/users.json`, JSON.stringify(users, null, 4));
}