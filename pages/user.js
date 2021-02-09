//Components
import {Menu, User } from '../components';

//Other
import {getInitialReduxState} from '../helpers/getInitialReduxstate';

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

   const initialReduxState = await getInitialReduxState(context);

   return {
        props: {
            initialReduxState,
        }
    }
}

export default UserPage;
