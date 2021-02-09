// Core
import {useDispatch, useSelector} from 'react-redux';

// Actions
import { userActions } from '../../bus/user';

export const User =  () => {
    const { user } = useSelector((state) => state);
    const dispatch = useDispatch();

    const upgradeStatus = () => {
        const type = user.userType === 'Guest' ? 'Friend' : 'familyMember'
        dispatch(userActions.setUserType(type));
    };

    const userIdJSX = user && <p>UserId: {user.userId}</p>;

    const userTypeJSX = user && <p>Welcome, {user.userType}</p>;

    const viewsJSX = user && <p>Views: {user.visitCounts}</p>;

    return (
        <>
            <button
                onClick={ upgradeStatus }
                disabled={user.userType === 'familyMember'}>Временно повысить свой статус</button>
            {userIdJSX}
            {userTypeJSX}
            {viewsJSX}
        </>
    )
}