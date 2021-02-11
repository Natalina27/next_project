import {readUsers} from './readUsers';
import {writeUsers} from './writeUsers';

export const  findOrCreateUser = async(userId) => {
    const users = await readUsers();
    const user = users.find((user) => user.userId === userId);

    if (!user) {
        const newUser = { userId, visitCounts: 0 };
        await writeUsers([...users, newUser]);
        return newUser;
    }
    return user;
}