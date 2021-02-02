//Components
import { User } from "../components/user";
import { Menu } from "../components/Menu/menu";


//Other
import { initialDispatcher } from "../init/initialDispatcher";
import { initializeStore } from "../init/store";
import {userActions} from "../bus/user/actions";
import {readFromData} from "../helpers/readFromData";

export const getServerSideProps = async (context) => {
    //redux
    const store = await initialDispatcher(context, initializeStore());
    const initialReduxState = store.getState();

    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const visits = users.find((user) => {
        return user.visitCounts;
    });

    store.dispatch(userActions.setVisitCounts(visits));

    return {
        props: {
            initialReduxState,
        }
    }
}

const UserPage = ({initialReduxState}) => {
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
