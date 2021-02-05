// Core
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { userActions } from "../bus/user/actions";

export const User = ({initialReduxState}) => {
    const initialViewsPage = initialReduxState.user;
    const dispatch = useDispatch();

    dispatch(userActions.fillUser(initialViewsPage.userId));
    dispatch(userActions.setVisitCounts(initialViewsPage.visitCounts));
    dispatch(userActions.setUserType(initialViewsPage.userType));

    const { user } = useSelector((state) => state);

    const upgradeStatus = () => {
        const userType =  user.userType === 'Guest' ? 'Friend' : 'familyMember';
        dispatch(userActions.setUserType(userType));
    };

    const userIdJSX = user && <p>UserId: {user.userId}</p>;

    const userTypeJSX = user && <p>Welcome, {user.userType}</p>;

    const viewsJSX = user && <p>Views: {user.visitCounts}</p>;

    return (
        <>
            <button onClick={upgradeStatus}>Временно повысить свой статус</button>
            {userIdJSX}
            {userTypeJSX}
            {viewsJSX}
        </>
    )
}