//Components
import {Menu} from "../components/Menu/menu";
import {Message} from "../components/message";

//Other
import {getInitialReduxState} from "../helpers/getInitialReduxstate";
import {getUserFromSelector} from "../helpers/getUserFromSelector";

export const getServerSideProps = async (context) => {

    const initialReduxState = await getInitialReduxState(context);
    console.log('initialReduxState', initialReduxState);

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

    const user = getUserFromSelector(initialReduxState);
    console.log(' index user', user);
    const viewsJSX = user && <p>Views: {user.visitCounts}</p>;

    return (
        <>
            <Menu/>
            <h1> Home</h1>
            <Message/>
            {viewsJSX}
        </>
    );
};

export default HomePage;
