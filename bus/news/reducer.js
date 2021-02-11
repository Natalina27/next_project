import { types } from './types';

const initialState = [];

export const newsReducer = (
    state = initialState, action
) => {
    const { type, payload } = action;

    switch (type) {
        case types.FILL_NEWS:
            return  payload;

        default:
            return state;
    }
};