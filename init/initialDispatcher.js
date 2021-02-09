import {userActions} from '../bus/user';
import {analyzeCookies} from "../helpers/analyzeCookies";
import {readFromData} from "../helpers/readFromData";
import {defineUserType} from "../helpers/defineUserType";

export const initialDispatcher = async (
    context,
    store,
) => {

    const { userId } = await analyzeCookies(context);
    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const user = users.find((user) => {
        return user.userId === userId;
    });
    const { visitCounts } = user || 1;
    const  userType  = defineUserType(visitCounts);

    store.dispatch(userActions.fillUser(userId));
    store.dispatch(userActions.setVisitCounts(visitCounts));
    store.dispatch(userActions.setUserType(userType));

    return store;
}
