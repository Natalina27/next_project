// Core
import { useRouter } from 'next/router';

// Components
import { Menu, Discount } from '../../components';

//Actions
import { discountsActions } from '../../bus/discounts';

// Other
import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';

const DiscountByIdPage = ({ initialReduxState: { discounts = [] } }) => {
    const router = useRouter();
    const { id } = router.query;
    const discount = discounts.find((item) => item.id === id);

    return (
        <>
            <Menu />
            { discount && <Discount single { ...discount } /> }
        </>
    );
};

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    const initialReduxState = store.getState();
    const { discountsData } = initialReduxState;
    store.dispatch(discountsActions.fillDiscounts(discountsData));

    return {
        props: {
            initialReduxState: {
                discounts: discountsData,
            },
        },
    };
};


export default DiscountByIdPage;
