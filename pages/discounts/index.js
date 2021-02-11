//Components
import { Discounts, Menu } from '../../components';

//Actions
import {discountsActions} from '../../bus/discounts';

//Others
import {initialDispatcher} from '../../init/initialDispatcher';
import {initializeStore} from '../../init/store';

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
    const initialReduxState = store.getState();
    console.log('D initialReduxState', initialReduxState);
    const { discountsData } =  await initialReduxState.discounts;
    store.dispatch(discountsActions.fillDiscounts(discountsData));
    return {
        props: {
            initialReduxState: {
                discounts: discountsData,
            },
        },
    };
};


export default DiscountsPage;