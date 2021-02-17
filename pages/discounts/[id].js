// Core
import { useRouter } from 'next/router';
import {useSelector} from 'react-redux';

// Components
import { Menu, Discount, Back } from '../../components';

// Actions
import {discountsActions, selectDiscounts} from '../../bus/discounts';

// Other
import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';
import {readDiscounts} from '../../helpers/readData';

const DiscountByIdPage = () => {
    const news = useSelector(selectDiscounts);
    const router = useRouter();
    const { id } = router.query;
    const discount = news.find((item) => item.id === id);
    const { content, dateOfReceiving } = discount;

    return (
        <>
            <Menu />
            <Discount id={id}
                     content={content}
                     dateOfReceiving={dateOfReceiving}
            />
            <Back />
        </>
    );
};

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    const  discountsData  = await readDiscounts();
    store.dispatch(discountsActions.fillDiscounts(discountsData));
    const initialReduxState = store.getState();

    return {
        props: {
            initialReduxState
        },
    };
};

export default DiscountByIdPage;
