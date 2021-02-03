//Core
import React from "react";
//Components
import { News } from "../components/news";
import { Discounts } from "../components/discounts";
import { Cars } from "../components/cars";
import { Menu } from "../components/Menu/menu";

//Other
import { analyzeCookies } from "../helpers/analyzeCookies";
import { readFromData } from "../helpers/readFromData";
import { writeIntoData } from "../helpers/writeIntoData";
import { defineUserType } from "../helpers/defineUserType";
import { initialDispatcher } from "../init/initialDispatcher";
import { initializeStore } from "../init/store";
import { userActions } from "../bus/user/actions";
import {useDispatch} from "react-redux";

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());

    const { userId } = await analyzeCookies(context);

    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const user = users.find((user) => {
       return user.userId === userId;
     });

    let str = "";
    let userType = '';
    if (user) {
        const { visitCounts } = user;

        userType = defineUserType(visitCounts);
        console.log('userType', userType);
        store.dispatch(
            userActions.fillUser({userId}),
            userActions.setVisitCounts(visitCounts),
            userActions.setUserType(userType)
        );

    } else {
         str = "There is no any user";
    }
     //news
     const newsSource = await readFromData(`./data/news.json`);
     const newsData =  JSON.parse(newsSource);
     await writeIntoData(newsData, `./data/news.json`);

     //discounts
    const discountSource = await readFromData(`./data/discounts.json`);
    const discountsData =  JSON.parse(discountSource);
    await writeIntoData(discountsData, `./data/discounts.json`);

    //cars
    const carsSource = await readFromData(`./data/cars.json`);
    const carsData =  JSON.parse(carsSource);
    await writeIntoData(carsData, `./data/cars.json`);

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

const DashboardPage = (props) => {
    console.log('==============');

    const {
         str,
        userType,
        newsData,
        discountsData,
        carsData,
        initialReduxState,
    } = props;
    const isVisitor = userType === 'Guest';
    const isFriend = userType === 'Friend';
    const isFamily = userType === 'familyMember';

    const visitorJSX = isVisitor && (
        <News newsData={newsData}/>
    );
    const friendJSX = isFriend && (
        <>
            <News newsData={newsData}/>
            <Discounts discountsData={discountsData}/>
        </>
    );
    const familyJSX = isFamily && (
        <>
            <News newsData={newsData}/>
            <Discounts discountsData={discountsData}/>
            <Cars carsData={carsData}/>
        </>
    );

    console.log('initialReduxState', initialReduxState);

    const initialViewsPage = initialReduxState.user;
    const dispatch = useDispatch();
    dispatch(userActions.fillUser({user: initialViewsPage }));

    return (
        <div>
            <Menu />
            { visitorJSX }
            { friendJSX }
            { familyJSX }
            {str}
        </div>
    );
};

export default DashboardPage;