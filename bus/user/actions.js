import { types } from "./types";

export const userActions = {
    fillUser: (user) => {
        return {
            type: types.FILL_USER,
            payload: user,
        }
    },
    setVisitCounts: () => {
        return {
            type: types.SET_VISIT_COUNTS,
        }
    },
    setUserType: () => {
        return {
            type: types.SET_USER_TYPE,
        }
    },

};
