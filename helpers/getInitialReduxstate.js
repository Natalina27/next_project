import {initialDispatcher} from "../init/initialDispatcher";
import {initializeStore} from "../init/store";
import {analyzeCookies} from "./analyzeCookies";
import {countUserVisits} from "./countUserVisits";
import {defineUserType} from "./defineUserType";
import {userActions} from "../bus/user/actions";

export const getInitialReduxState  = async(context) => {

    const store = await initialDispatcher(context, initializeStore());
    const {userId} = await analyzeCookies(context);

    const visitCounts = await countUserVisits(userId);
    const userType = defineUserType(visitCounts);

    store.dispatch(userActions.fillUser(userId));
    store.dispatch(userActions.setVisitCounts(visitCounts));
    store.dispatch(userActions.setUserType(userType));

    return store.getState();
}