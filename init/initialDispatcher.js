import {profileActions} from "../bus/profile/actions";

export const initialDispatcher = async (
    context,
    store
) => {
    store.dispatch(profileActions.fillProfile({
        firstName: 'Default',
    }));

    return store;
}
