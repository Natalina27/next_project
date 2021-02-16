import { readUser } from './readData';
import { writeUsers } from './writeUsers';

export const countUserVisits = async (user) => {
    const users = await readUser();
    const updatedUser = { ...user, visitCounts: user.visitCounts + 1 };
    const updatedUsers = users.map((user) => user.userId === updatedUser.userId ? updatedUser : user);
    await writeUsers(updatedUsers);
    const { visitCounts } = updatedUser;
    return visitCounts;
}