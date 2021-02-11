import { types } from './types';

const initialState = [];

export const carsReducer = (
    state = initialState,
    action
) => {
    const { type, payload } = action;

    switch (type) {
        case types.FILL_CARS:
            return  payload;
       default:
            return state;
    }
};
