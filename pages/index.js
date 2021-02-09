//Components
import { Menu, Message } from '../components';

//Other
import {getInitialReduxState} from '../helpers/getInitialReduxstate';
import {getUserFromSelector} from '../helpers/getUserFromSelector';

const HomePage = (props) => {
    const { initialReduxState } = props;

    const user = getUserFromSelector(initialReduxState);
    const viewsJSX = user && <p>Views: {user.visitCounts}</p>;

    return (
        <>
            <Menu />
            <h1> Home</h1>
            <Message />
            {viewsJSX}
        </>
    );
};

export const getServerSideProps = async (context) => {

    const initialReduxState = await getInitialReduxState(context);

    return {
        props: {
            initialReduxState,
        }
    }
}

export default HomePage;
