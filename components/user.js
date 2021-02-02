// Core
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { userActions } from "../bus/user/actions";

export const User = () => {
    console.log('User Component');
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state);
    console.log('User from useSelector', user);

    const upgradeStatus = () => {
        dispatch(userActions.setUserType(
             user.userType =
                 user.userType === 'Guest' ? 'Friend' : 'familyMember'
        ));
    };

    const userIdJSX = user && (
        <p>UserId: {user.userId}</p>
    );

    const userTypeJSX = user && (
        <p>Welcome, {user.userType}</p>
    );

    const viewsJSX = user && (
        <p>Views: {user.visitCounts}</p>
    );

    return (
        <>
            <button onClick={upgradeStatus}>Временно повысить свой статус</button>
            {userIdJSX}
            {userTypeJSX}
            {viewsJSX}
        </>
    )
}