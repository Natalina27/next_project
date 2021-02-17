// Core
import { useRouter } from 'next/router';
import {useSelector} from 'react-redux';

// Components
import { Menu, Car, Back } from '../../components';

//Actions
import { carsActions, selectCars } from '../../bus/cars';

// Others
import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';
import { readCars } from '../../helpers/readData';

const CarByIdPage = () => {
    const cars = useSelector(selectCars);
    const router = useRouter();
    const { id } = router.query;
    const car = cars.find((item) => item.id === id);
    const { content, dateOfReceiving } = car;

    return (
        <>
            <Menu />
            <Car id={id}
                 content={content}
                 dateOfReceiving={dateOfReceiving}
            />
            <Back />
        </>
    );
};

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    const carsData = await readCars();
    store.dispatch(carsActions.fillCars(carsData));
    const initialReduxState = store.getState();

    return {
        props: {
            initialReduxState,
        },
    };
};

export default CarByIdPage;