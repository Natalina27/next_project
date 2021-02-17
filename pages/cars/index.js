//Components
import {Cars, Menu} from '../../components';

//Actions
import {carsActions} from '../../bus/cars';

//Others
import {initializeStore} from '../../init/store';
import {initialDispatcher} from '../../init/initialDispatcher';
import {readCars} from '../../helpers/readData';

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
    const carsData =  await readCars();
    store.dispatch(carsActions.fillCars(carsData));
    const initialReduxState = store.getState();

    return {
        props: {
            initialReduxState,
        },
    };
}

export default CarsPage;