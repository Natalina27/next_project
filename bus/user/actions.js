import { types } from "./types";

export const userActions = {
    fillUser: (userId) => {
        return {
            type: types.FILL_USER,
            payload: userId,
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
