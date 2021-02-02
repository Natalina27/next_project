import { types } from "./types";

const initialState = {
    userId: 'UserId',
    visitCounts: 0,
    userType: 'Guest'
};

export const userReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case types.FILL_USER:
            return {...state, ...payload};
        case types.SET_VISIT_COUNTS:
            return {...state};
        case types.SET_USER_TYPE:
            return {...state};
        default:
            return state;
    }
};
