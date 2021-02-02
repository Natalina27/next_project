import {userActions} from "../bus/user/actions";
import {analyzeCookies} from "../helpers/analyzeCookies";
import {readFromData} from "../helpers/readFromData";

export const initialDispatcher = async (
    context,
    store,
) => {

    let isVisitor = true;
    let isFriend  = false;

    const { userId } = await analyzeCookies(context);
    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const user = users.find((user) => {
        return user.userId === userId;
    });
    const { visitCounts } = user || 1;
    const  userType  = isVisitor ? 'Guest': isFriend ? 'Friend' : 'familyMember';

    store.dispatch(
        userActions.fillUser({userId}),
        userActions.setVisitCounts(visitCounts),
        userActions.setUserType(userType)
    );

    return store;
}
