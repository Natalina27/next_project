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
import { defineVisitorsType } from "../helpers/defineVisitorsType";
import { initialDispatcher } from "../init/initialDispatcher";
import { initializeStore } from "../init/store";
import { userActions } from "../bus/user/actions";

export const getServerSideProps = async (context) => {
    //redux
    const store = await initialDispatcher(context, initializeStore());

    store.dispatch(
        userActions.fillUser({
            userId: 'UserId from Home page',
        }),
        userActions.setVisitCounts({
            visitCounts: 3
        }),
        userActions.setUserType({
            userType: 'dipende'
        })
    );
    const initialReduxState = store.getState();

    //cookies
    const { userId } = await analyzeCookies(context);

    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const user = users.find((user) => {
       return user.userId === userId;
     });

    let isVisitor = false, isFriend = false, isFamily = false, str = "";

    if (user) {
        const { visitCounts } = user;
        [isVisitor, isFriend, isFamily] = defineVisitorsType(visitCounts);

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

    return {
        props: {
            isVisitor,
            isFriend,
            isFamily,
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
        isVisitor,
        isFriend,
        isFamily,
        str,
        newsData,
        discountsData,
        carsData,
        initialReduxState,
    } = props;

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