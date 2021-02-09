//Components
import { useUser } from '../bus/user';
import {Menu, User } from '../components';
import { initialDispatcher } from '../init/initialDispatcher';
import { initializeStore } from '../init/store';

//Other

const UserPage = () => {
    // const user = useUser()
    // console.log(user)
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

   return {
        props: {
            initialReduxState: store.getState(),
        }
    }
}

export default UserPage;
