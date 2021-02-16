import {initialDispatcher} from "../init/initialDispatcher";
import {initializeStore} from "../init/store";
import {Cars, Discounts, Menu, News} from "../components";
import {useSelector} from "react-redux";
import {selectUser} from "../bus/user";
import React from "react";
import {readCars, readDiscounts, readNews} from "../helpers/readData";
import {carsActions} from "../bus/cars";
import {discountsActions} from "../bus/discounts";
import {newsActions} from "../bus/news";


const Dashboard = () => {
    const  user = useSelector(selectUser);
    const { userType, visitCounts } = user;

    const isVisitor = userType === 'Guest';
    const isFriend = userType === 'Friend';
    const isFamily = userType === 'familyMember';

    const visitorJSX = (isVisitor || isFriend ||  isFamily)  && <News title= "🗞 News" />;
    const friendJSX = (isFriend || isFamily) &&  <Discounts title='📉 Discounts' />;
    const familyJSX = isFamily && <Cars title= "🏎 Cars" />;
    const viewsJSX = user && <p>Views: {visitCounts}</p>;


    return (
        <div>
            <Menu />
            {visitorJSX}
            {friendJSX}
            {familyJSX}
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