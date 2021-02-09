import { types } from './types';

const initialState = {
    newsData: null
};

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