import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import {useDispatch, useSelector} from "react-redux";
import {profileActions} from "../bus/profile/actions";

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    store.dispatch(profileActions.fillProfile({
        lastName: 'Name from page Redux',
    }));
    const initialReduxState = store.getState();

    return {
        props: {
            initialReduxState,
        }
    }
}

const Redux = ({ initialReduxState }) => {
    console.log('initialReduxState', initialReduxState);

    const dispatch = useDispatch(); //???
    const { profile } = useSelector((state) => state);

    return (
        <>
            <h1>Redux Page</h1>
            <h2>Name: {profile.firstName}</h2>
            <h2>LastName: {profile.lastName}</h2>
        </>
    )
};

export default Redux;
