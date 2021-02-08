//Core
import React from "react";

//Components
import { Menu } from "../components/Menu";

//Actions
import { userActions } from "../bus/user/actions";

//Other
import { analyzeCookies } from "../helpers/analyzeCookies";
import { readFromData } from "../helpers/readFromData";
import { writeIntoData } from "../helpers/writeIntoData";
import { defineUserType } from "../helpers/defineUserType";
import { initialDispatcher } from "../init/initialDispatcher";
import { initializeStore } from "../init/store";
import { countUserVisits } from "../helpers/countUserVisits";
import { getUserFromSelector } from "../helpers/getUserFromSelector";
import {News} from "../components/News";
import {Discounts} from "../components/Discounts";
import {Cars} from "../components/Cars";

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());

    const {userId} = await analyzeCookies(context);

    let str = '';
    let userType = '';

    if (userId) {
        const visitCounts = await countUserVisits(userId);
        userType = defineUserType(visitCounts);

        store.dispatch(userActions.fillUser(userId));
        store.dispatch(userActions.setVisitCounts(visitCounts));
        store.dispatch(userActions.setUserType(userType));

    } else {
        str = "There is no any user";
    }
    //news
    const newsSource = await readFromData(`./data/news.json`);
    const newsData = JSON.parse(newsSource);
    await writeIntoData(`./data/news.json`, newsData);

    //discounts
    const discountSource = await readFromData(`./data/discounts.json`);
    const discountsData = JSON.parse(discountSource);
    await writeIntoData(`./data/discounts.json`, discountsData);

    //cars
    const carsSource = await readFromData(`./data/cars.json`);
    const carsData = JSON.parse(carsSource);
    await writeIntoData(`./data/cars.json`, carsData);

    const initialReduxState = store.getState();

    return {
        props: {
            str,
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
        newsData,
        discountsData,
        carsData,
        initialReduxState
    } = props;

    const user = getUserFromSelector(initialReduxState);
    console.log(user);

    const userType = user.userType;
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

    const viewsJSX = user && <p>Views: {user.visitCounts}</p>;

    return (
        <div>
            <Menu />
            {visitorJSX}
            {friendJSX}
            {familyJSX}
            {str}
            {viewsJSX}
        </div>
    );
};

export default DashboardPage;