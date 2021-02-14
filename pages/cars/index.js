//Components
import {Cars, Menu} from '../../components';

//Actions
import {carsActions} from '../../bus/cars';

//Others
import {initializeStore} from '../../init/store';
import {initialDispatcher} from '../../init/initialDispatcher';
import {getInitialReduxState} from "../../helpers/getInitialReduxstate";

const CarsPage = () => {
    return (
        <>
          <Menu />
          <Cars title= "🏎 Cars" />
        </>
    );
};

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    const initialReduxState = await getInitialReduxState(store);
    store.dispatch(carsActions.fillCars(initialReduxState));

    return {
        props: {
            initialReduxState,
        },
    };
}

export default CarsPage;