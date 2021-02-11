import {readFromData} from './readFromData'

export const readUsers = async () => {
    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);

    return users;
}