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
            return {...state, visitCounts: 0};
        case types.SET_USER_TYPE:
            return {...state, userType: 'Guest'};
        default:
            return state;
    }
};
