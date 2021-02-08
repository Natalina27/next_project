//Components
import {Menu} from "../components/Menu";
import {User} from "../components/User";

//Other
import {getInitialReduxState} from "../helpers/getInitialReduxstate";

export const getServerSideProps = async (context) => {

   const initialReduxState = await getInitialReduxState(context);

   return {
        props: {
            initialReduxState,
        }
    }
}

const UserPage = () => {
    return (
        <>
            <Menu/>
            <h1> User Page </h1>
            <User />
        </>
    );
};

export default UserPage;
