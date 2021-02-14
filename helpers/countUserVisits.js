import { readUsers } from './readUsers';
import { writeUsers } from './writeUsers';

export const countUserVisits = async (user) => {
    const users = await readUsers();
    const updatedUser = { ...user, visitCounts: user.visitCounts + 1 };
    const updatedUsers = users.map((user) => user.userId === updatedUser.userId ? updatedUser : user);
    await writeUsers(updatedUsers);
    const { visitCounts } = updatedUser;
    return visitCounts;
}