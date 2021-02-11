import { types } from './types';

const initialState = [];

export const discountsReducer = (
    state = initialState, action
) => {
    const { type, payload } = action;

    switch (type) {
        case types.FILL_DISCOUNTS:
            return payload;

        default:
            return state;
    }
};
