//Core
import {useDispatch} from "react-redux";

//Components
import { Menu } from "../components/Menu/menu";
import {Message} from "../components/message";

//Actions
import { userActions } from "../bus/user/actions";

//FS
import { readFromData } from "../helpers/readFromData";
import {writeIntoUsersData} from "../helpers/writeIntoUserData";

//Other
import { analyzeCookies } from "../helpers/analyzeCookies";
import { defineUserType } from "../helpers/defineUserType";
import { initialDispatcher } from "../init/initialDispatcher";
import { initializeStore } from "../init/store";

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    const { userId } = await analyzeCookies(context);
    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse( source);
    const user = users.find((user) => {
        return user.userId === userId;
    });

    let userType = '';

    if (user) {
        const updatedUser = { ...user, visitCounts: user.visitCounts++ };
        const updatedUsers = users.map((user) => user.id === userId ? updatedUser : user);
        await writeIntoUsersData('./data/users.json', updatedUsers);

        const { visitCounts } = user;

        userType = defineUserType(visitCounts);

        store.dispatch(userActions.fillUser(userId));
        store.dispatch(userActions.setVisitCounts(visitCounts));
        store.dispatch(userActions.setUserType(userType));

    } else {
        await writeIntoUsersData(`./data/users.json`, [...users, { userId, visitCounts: 1 }]);
    }
    const initialReduxState = store.getState();

    return {
        props: {
            initialReduxState,
        }
    }
 }

const HomePage = (props) => {
    const {
        initialReduxState
    } = props;

    const initialViewsPage = initialReduxState.user;
    const dispatch = useDispatch();
    dispatch(userActions.fillUser(initialViewsPage.userId));
    dispatch(userActions.setVisitCounts(initialViewsPage.visitCounts));
    dispatch(userActions.setUserType(initialViewsPage.userType));

    return (
        <>
            <Menu />
            <h1> Home</h1>
            <Message />
        </>
    );
};

export default HomePage;
