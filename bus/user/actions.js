import { types } from "./types";

export const userActions = Object.freeze({
    fillUser: (userId) => {
        return {
            type: types.FILL_USER,
            payload: userId,
        }
    },
    setVisitCounts: (visitsCount) => {
        return {
            type: types.SET_VISIT_COUNTS,
            payload: visitsCount
        }
    },
    setUserType: (userType) => {
        return {
            type: types.SET_USER_TYPE,
            payload: userType
        }
    },
});