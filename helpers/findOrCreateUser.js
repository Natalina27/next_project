import {readUser} from './readData';
import {writeUsers} from './writeUsers';

export const  findOrCreateUser = async(userId) => {
    const users = await readUser();
    const user = users.find((user) => user.userId === userId);

    if (!user) {
        const newUser = { userId, visitCounts: 0 };
        await writeUsers([...users, newUser]);
        return newUser;
    }
    return user;
}