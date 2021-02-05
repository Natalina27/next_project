import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../bus/user/actions";

export const getUserFromSelector = (initReduxState) => {
    const initialViewsPage = initReduxState.user;
    const dispatch = useDispatch();

    dispatch(userActions.fillUser(initialViewsPage.userId));
    dispatch(userActions.setVisitCounts(initialViewsPage.visitCounts));
    dispatch(userActions.setUserType(initialViewsPage.userType));

    const {user} = useSelector((state) => state);

    return user;
}