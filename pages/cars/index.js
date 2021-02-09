//Core
import React from 'react';

//Components
import {Cars, Menu} from '../../components';

//Actions
import {carsActions} from '../../bus/cars';

//Others
import {getInitialReduxState} from "../../helpers/getInitialReduxstate";
import {initialDispatcher} from "../../init/initialDispatcher";
import {initializeStore} from "../../init/store";

const CarsPage = () => {
    return (
        <>
          <Menu />
          <Cars title= "🏎 Тачки" />
        </>
    );
};

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    const initialReduxState  = getInitialReduxState(context);
    const { carsData } = initialReduxState;
    store.dispatch(carsActions.fillCars(carsData));

    return {
        props: {
            initialReduxState,
            carsData,
        },
    };
}

export default CarsPage;