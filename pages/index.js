import { useSelector } from "react-redux";
import { useUser } from "../bus/user";
//Components
import { Menu, Message } from '../components';

//Other
import { initialDispatcher } from "../init/initialDispatcher";
import { initializeStore } from "../init/store";

const HomePage = () => {
    const user = useUser()
    useSelector(state => console.log(1, state))
    const userJSX = user && <p>Views: {user.visitCounts}</p>

    return (
        <>
            <Menu />
            <h1> Home</h1>
            <Message />
            {userJSX}
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
