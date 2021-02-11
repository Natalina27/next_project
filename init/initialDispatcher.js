//Actions
import {userActions} from '../bus/user';

//Others
import {analyzeCookies} from '../helpers/analyzeCookies';
import {defineUserType} from '../helpers/defineUserType';
import {countUserVisits} from '../helpers/countUserVisits';
import {findOrCreateUser} from '../helpers/findOrCreateUser';

export const initialDispatcher = async (
    context,
    store,
) => {
    const { userId } =  analyzeCookies(context);
    const user = await findOrCreateUser(userId);
    const visitCounts = await countUserVisits(user);
    const  userType  = defineUserType(visitCounts);

    store.dispatch(userActions.fillUser(userId));
    store.dispatch(userActions.setVisitCounts(visitCounts));
    store.dispatch(userActions.setUserType(userType));

    return store;
}
