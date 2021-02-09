import {userActions} from '../bus/user';
import {analyzeCookies} from "../helpers/analyzeCookies";
import { defineUserType } from "../helpers/defineUserType";
import { countUserVisits } from '../helpers/countUserVisits';
import readUsers from '../helpers/readUsers'
import writeUsers from '../helpers/writeUsers'


async function findOrCreate(userId) {
    const users = await readUsers();
    const user = users.find((user) => user.userId === userId);

    if (!user) {
        const newUser = { userId, visitCounts: 0 };
        await writeUsers([...users, newUser]);
        return newUser;
    }

    return user;
}

export const initialDispatcher = async (
    context,
    store,
) => {
    const { userId } = analyzeCookies(context);
    const user = await findOrCreate(userId)
    const visitCounts = await countUserVisits(user)
    const userType  = defineUserType(visitCounts);

    store.dispatch(userActions.fillUser(userId));
    store.dispatch(userActions.setVisitCounts(visitCounts));
    store.dispatch(userActions.setUserType(userType));

    return store;
}
