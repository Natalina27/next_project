//Components
import {User} from "../components/user";
import {Menu} from "../components/Menu/menu";

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

const UserPage = ({initialReduxState}) => {
    return (
        <>
            <Menu/>
            <h1> User Page </h1>
            < User initialReduxState={initialReduxState}/>
        </>
    );
};

export default UserPage;
