// Core
import { useRouter } from 'next/router';

// Components
import { Menu, Car } from '../../components';

//Actions
import { carsActions } from '../../bus/cars';

// Others
import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';

const CarByIdPage = ({ initialReduxState: { cars = [] } }) => {
    const router = useRouter();
    const { id } = router.query;
    const car = cars.find((item) => item.id === id);

    return (
        <>
            <Menu />
            { car && <Car single { ...car } /> }
        </>
    );
};

export const getServerSideProps = async (context) => {
    const initialReduxState = await initialDispatcher(context, initializeStore());
    const { carsData } = initialReduxState;
    store.dispatch(carsActions.fillCars(carsData));

    return {
        props: {
            initialReduxState: {
                cars: carsData,
            },
        },
    };
};


export default CarByIdPage;