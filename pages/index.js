//Components
import { Menu, Message } from '../components';

//Other
import {useUser} from "../bus/user";
import {initialDispatcher} from "../init/initialDispatcher";
import {initializeStore} from '../init/store';

const HomePage = () => {
    const  user = useUser();
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

    const store = await initialDispatcher(context, initializeStore());

    return {
        props: {
            initialReduxState: store.getState(),
        }
    }
}

export default HomePage;
