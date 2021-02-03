//Core
import {useDispatch} from "react-redux";

//Components
import { Menu } from "../components/Menu/menu";

//Actions
import { userActions } from "../bus/user/actions";

//Other
import { analyzeCookies } from "../helpers/analyzeCookies";
import { readFromData } from "../helpers/readFromData";
import { defineUserType } from "../helpers/defineUserType";
import fs from "fs/promises";
import { initialDispatcher } from "../init/initialDispatcher";
import { initializeStore } from "../init/store";
import {Message} from "../components/message";

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());

    const { userId } = await analyzeCookies(context);

    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const user = users.find((user) => {
        return user.userId === userId;
    });

    let userType = '';

    if (user) {
        const updatedUser = { ...user, visitCounts: user.visitCounts++ };
        const updatedUsers = users.map((user) => user.id === userId ? updatedUser : user);
        await fs.writeFile(`./data/users.json`, JSON.stringify(updatedUsers, null, 4));

        const { visitCounts } = user;

        userType = defineUserType(visitCounts);

        store.dispatch(
            userActions.fillUser({
                userId,
                visitCounts,
                userType
            }),
        );
    } else {
        await fs.writeFile(`./data/users.json`, JSON.stringify([...users, { userId, visitCounts: 1 }], null, 4));
    }
    const initialReduxState = store.getState();

    return {
        props: {
            userId,
            userType,
            initialReduxState,
        }
    }
 }

const HomePage = (props) => {
    console.log('==============');
    console.log('Home page');

    const {
        initialReduxState
    } = props;

    console.log('initialReduxState', initialReduxState);
    const initialViewsPage = initialReduxState.user;
    const dispatch = useDispatch();
    dispatch(userActions.fillUser({
        user: initialViewsPage
    }));

    return (
        <>
            <Menu />
            <h1> Home</h1>
            <Message />
        </>
    );
};

export default HomePage;
