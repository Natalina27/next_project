import {readFromData} from './readFromData'

export default async function readUsers() {
    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source)

    return users
}