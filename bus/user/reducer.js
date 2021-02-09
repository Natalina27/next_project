import { types } from './types';

const initialState = {
    userId: null,
    visitCounts: 0,
    userType: 'Guest'
};

export const userReducer = (
    state = initialState,
    action
) => {
    const { type, payload } = action;

    switch (type) {
        case types.FILL_USER:
            return { ...state, userId: payload };
        case types.SET_VISIT_COUNTS:
            return { ...state, visitCounts: payload };
        case types.SET_USER_TYPE:
            return { ...state, userType: payload };
        default:
            return state;
    }
};
