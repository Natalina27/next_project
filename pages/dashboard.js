import React from "react";
import {analyzeCookies} from "../helpers/analyzeCookies";
import News from "../components/news";
import Discounts from "../components/discounts";
import Cars from "../components/cars";
import {readFromData} from "../helpers/readFromData";
import {writeIntoData} from "../helpers/writeIntoData";
import {countVisitors} from "../helpers/countVisitors";

export const getServerSideProps = async (context) => {

    const { userId } = await analyzeCookies(context);

    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const user = users.find((user) => {
       return user.userId === userId;
     });

    let isVisitor, isFriend, isFamily, str = "";

    if (user) {
        const { visitCounts } = user;
        [isVisitor, isFriend, isFamily] = countVisitors(visitCounts);

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
            carsData
        }
    }
}


const Dashboard = (props) => {
    const {
        isVisitor,
        isFriend,
        isFamily,
        str,
        newsData,
        discountsData,
        carsData
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

    return (
        <div>
            { visitorJSX }
            { friendJSX }
            { familyJSX }
            {str}
        </div>
    );
};

export default Dashboard;