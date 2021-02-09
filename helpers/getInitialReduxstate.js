import {initialDispatcher} from '../init/initialDispatcher';
import {initializeStore} from '../init/store';
import {analyzeCookies} from './analyzeCookies';
import {countUserVisits} from './countUserVisits';
import {defineUserType} from './defineUserType';
import {userActions} from '../bus/user';

export const getInitialReduxState  = async(context) => {
    const store = await initialDispatcher(context, initializeStore());
    const { userId } = await analyzeCookies(context);
    const visitCounts = await countUserVisits(userId);
    const userType = defineUserType(visitCounts);

    // 1. Инициализировать стор
    // 2. Узнать userId
    // 3. Увеличить колич виз
    // 4. Обновить стор

    store.dispatch(userActions.fillUser(userId));
    store.dispatch(userActions.setVisitCounts(visitCounts));
    store.dispatch(userActions.setUserType(userType));


    return store.getState();
}