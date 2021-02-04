// Core
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { userActions } from "../bus/user/actions";

export const User = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state);

    const userType =  user.userType === 'Guest' ? 'Friend' : 'familyMember';

    const upgradeStatus = () => {
        dispatch(userActions.setUserType(userType));
    };

    const userIdJSX = user && <p>UserId: {user.userId}</p>;

    const userTypeJSX = user && <p>Welcome, {user.userType}</p>;

    //views
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