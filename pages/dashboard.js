//Core
import React from "react";
import {useDispatch} from "react-redux";

//Components
import { News } from "../components/news";
import { Discounts } from "../components/discounts";
import { Cars } from "../components/cars";
import { Menu } from "../components/Menu/menu";

//Actions
import { userActions } from "../bus/user/actions";

//Other
import { analyzeCookies } from "../helpers/analyzeCookies";
import { readFromData } from "../helpers/readFromData";
import { writeIntoData } from "../helpers/writeIntoData";
import { defineUserType } from "../helpers/defineUserType";
import { initialDispatcher } from "../init/initialDispatcher";
import { initializeStore } from "../init/store";
import {writeIntoUsersData} from "../helpers/writeIntoUserData";

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
    const initialViewsPage = initialReduxState.user;
    const dispatch = useDispatch();
    dispatch(userActions.fillUser(initialViewsPage.userId));

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