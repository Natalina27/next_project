//Core
import React from 'react';

//Components
import { Menu, News, Discounts, Cars } from '../components';

//Actions
import {userActions, useUser} from '../bus/user';
import {carsActions} from '../bus/cars';
import {discountsActions} from '../bus/discounts';
import {newsActions} from '../bus/news';

//Other
import {initialDispatcher} from '../init/initialDispatcher';
import {initializeStore} from '../init/store';
import {analyzeCookies} from '../helpers/analyzeCookies';
import {readFromData} from '../helpers/readFromData';
import {defineUserType} from '../helpers/defineUserType';
import {writeIntoUsersData} from '../helpers/writeIntoUserData';
import {writeIntoData} from '../helpers/writeIntoData';

const DashboardPage = (
    { initialReduxState }
) => {
    const { news, discounts, cars } = initialReduxState;
    console.log('initialReduxState', initialReduxState);

    const  user = useUser();
    const viewsJSX = user && <p>Views: {user.visitCounts}</p>;

    return (
        <>
            <Menu />
            { news && <News title = '🗞 News' /> }
            { discounts  && <Discounts title="📉 Discounts" /> }
            { cars &&  <Cars title = '🏎 Cars' /> }
            {viewsJSX}
        </>
    );
};
export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    const { userId } = await analyzeCookies(context);
    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const user = users.find((user) => {
        return user.userId === userId;
    });

    let str = '';
    let userType = '';

    if (user) {
        const { visitCounts } = user;
        userType = defineUserType(visitCounts);
        const updatedUser = { ...user, visitCounts: user.visitCounts++ };
        const updatedUsers = users.map((user) => user.id === userId ? updatedUser : user);
        await writeIntoUsersData('./data/users.json', updatedUsers);

        store.dispatch(userActions.fillUser(userId));
        store.dispatch(userActions.setVisitCounts(visitCounts));
        store.dispatch(userActions.setUserType(userType));

    } else {
        str = "There is no any user";
    }
    //news
    const newsSource = await readFromData(`./data/news.json`);
    const newsData =  JSON.parse(newsSource);
    await writeIntoData( `./data/news.json`, newsData);

    //discounts
    const discountSource = await readFromData(`./data/discounts.json`);
    const discountsData =  JSON.parse(discountSource);
    await writeIntoData(`./data/discounts.json`, discountsData);

    //cars
    const carsSource = await readFromData(`./data/cars.json`);
    const carsData =  JSON.parse(carsSource);
    await writeIntoData(`./data/cars.json`, carsData);

    store.dispatch(carsActions.fillCars(carsData));
    store.dispatch(discountsActions.fillDiscounts(discountsData));
    store.dispatch(newsActions.fillNews(newsData));
    const initialReduxState = store.getState();


    return {
        props: {
            str,
            userType,
            newsData,
            discountsData,
            carsData,
            initialReduxState
        }
    }
}

export default DashboardPage;