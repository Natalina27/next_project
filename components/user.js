// Core
import { useDispatch } from 'react-redux';

// Actions
import { userActions } from "../bus/user/actions";
import {getUserFromSelector} from "../helpers/getUserFromSelector";

export const User = ({initialReduxState}) => {
    const user = getUserFromSelector(initialReduxState);

    const upgradeStatus = () => {
        const dispatch = useDispatch();
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