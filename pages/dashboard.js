//Core
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

//Components
import { Menu } from '../components';

//Actions
import { carsActions } from '../bus/cars';
import { discountsActions } from '../bus/discounts';
import { newsActions } from '../bus/news';

//Styles
import Styles from "../components/Menu/styles.module.scss";

//Others
import { initialDispatcher } from '../init/initialDispatcher';
import { initializeStore } from '../init/store';
import { selectUser } from '../bus/user';
import { readCars, readDiscounts, readNews } from '../helpers/readData';

const Dashboard = () => {
    const  user = useSelector(selectUser);
    const { userType, visitCounts } = user;

    const isVisitor = userType === 'Guest';
    const isFriend = userType === 'Friend';
    const isFamily = userType === 'familyMember';

    const visitorJSX = (isVisitor || isFriend ||  isFamily)  &&  '🗞 News' ;
    const friendJSX = (isFriend || isFamily) &&  '📉 Discounts';
    const familyJSX = isFamily && '🏎 Cars' ;
    const viewsJSX = user && <p>Views: {visitCounts}</p>;


    return (
        <div>
            <Menu />
            <nav className={Styles.dashboard}>
                <Link href={'/news'}>
                    <a> { visitorJSX } </a>
                </Link>
                <Link href={'/discounts'}>
                    <a > { friendJSX }</a>
                </Link>
                <Link href={'/cars'}>
                    <a > { familyJSX } </a>
                </Link>
            </nav>
            {viewsJSX}
        </div>
    );

};

export const getServerSideProps = async (context) => {
    const news = await readNews();
    const discounts = await readDiscounts();
    const cars = await readCars();

    const store = await initialDispatcher(context, initializeStore());
    store.dispatch(carsActions.fillCars(cars));
    store.dispatch(discountsActions.fillDiscounts(discounts));
    store.dispatch(newsActions.fillNews(news));
    const initialReduxState = store.getState();

    return {
        props: {
            initialReduxState,
        },
    };
};

export default Dashboard;