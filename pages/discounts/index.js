//Components
import { Discounts, Menu } from '../../components';

//Actions
import {discountsActions} from '../../bus/discounts';

//Others
import {initialDispatcher} from '../../init/initialDispatcher';
import {initializeStore} from '../../init/store';
import {getInitialReduxState} from '../../helpers/getInitialReduxstate';

const DiscountsPage = () => {
    return (
        <>
            <Menu />
            <Discounts title='📉 Discounts' />
        </>
    );
};

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    const initialReduxState = getInitialReduxState(context);
    const { discountsData } = await initialReduxState.user;
    store.dispatch(discountsActions.fillDiscounts(discountsData));

    console.log('D initialReduxState', initialReduxState);
    return {
        props: {
            initialReduxState: {
                discounts: discountsData,
            },
        },
    };
};


export default DiscountsPage;