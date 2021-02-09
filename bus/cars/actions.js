import { types } from './types';

export const carsActions = Object.freeze({
    fillCars: (carsData) => {
        return{
            type: types.FILL_CARS,
            payload: carsData,
        }
    },
});
