//Components
import { User } from "../components/user";
import { Menu } from "../components/Menu/menu";

//Actions
import {userActions} from "../bus/user/actions";

//Other
import { initialDispatcher } from "../init/initialDispatcher";
import { initializeStore } from "../init/store";
import {readFromData} from "../helpers/readFromData";
import {defineUserType} from "../helpers/defineUserType";
import {analyzeCookies} from "../helpers/analyzeCookies";

export const getServerSideProps = async (context) => {
    //redux
    const store = await initialDispatcher(context, initializeStore());


     const { userId } = await analyzeCookies(context);

    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const user = users.find((user) => {
        return user.userId === userId;
    });

    const { visitCounts } = user;
    const userType = defineUserType(visitCounts);

    store.dispatch(
        userActions.fillUser({
            userId,
            visitCounts,
            userType
        }),
    );

    const initialReduxState = store.getState();

    return {
        props: {
            initialReduxState,
        }
    }
}

const UserPage = ({initialReduxState}) => {
    console.log('==============');
    console.log('User Page');
    console.log('initialReduxState', initialReduxState);

    return (
        <>
            <Menu />
            <h1> User Page </h1>
            < User />
        </>
    );
};

export default UserPage;
