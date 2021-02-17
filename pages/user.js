//Components
import { Menu, User } from '../components';

//Other
import { initialDispatcher } from '../init/initialDispatcher';
import { initializeStore } from '../init/store';

const UserPage = () => {
    return (
        <>
            <Menu/>
            <h1> User Page </h1>
            <User />
        </>
    );
};

export const getServerSideProps = async (context) => {

   const store = await initialDispatcher(context, initializeStore());
   const initialReduxState = store.getState();

    return {
        props: {initialReduxState}
    }
}

export default UserPage;
