//Core
import {useDispatch, useSelector} from "react-redux";

//Components
import {Menu} from "../components/Menu/menu";
import {Message} from "../components/message";

//Actions
import {userActions} from "../bus/user/actions";

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

const HomePage = (props) => {
    const {
        initialReduxState
    } = props;

    const initialViewsPage = initialReduxState.user;
    const dispatch = useDispatch();
    dispatch(userActions.fillUser(initialViewsPage.userId));
    dispatch(userActions.setVisitCounts(initialViewsPage.visitCounts));
    dispatch(userActions.setUserType(initialViewsPage.userType));

    //views
    const {user} = useSelector((state) => state);
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
