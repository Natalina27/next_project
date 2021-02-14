//Components
import { Discounts, Menu } from '../../components';

//Actions
import {discountsActions} from '../../bus/discounts';

//Others
import {initialDispatcher} from '../../init/initialDispatcher';
import {initializeStore} from '../../init/store';
import {readFromData} from "../../helpers/readFromData";

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
    const discountsSource = await readFromData(`./data/discounts.json`);
    const discountsData =  JSON.parse(discountsSource);
    store.dispatch(discountsActions.fillDiscounts(discountsData));
    const initialReduxState = store.getState();
    return {
        props: {
            initialReduxState,
        },
    };
};


export default DiscountsPage;