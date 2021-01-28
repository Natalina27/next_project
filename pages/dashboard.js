import React from "react";
import fs from "fs/promises";
import {analyzeCookies} from "../helpers/analyzeCookies";
import News from "../components/news";
import Discounts from "../components/discounts";
import Cars from "../components/cars";

export const getServerSideProps = async (context) => {

    const { userId } = await analyzeCookies(context);

    const source = await fs.readFile(`./data/users.json`, 'utf-8');
    const users = JSON.parse(source);
    const user = users.find((user) => {
       return user.userId === userId;
     });


    let isVisitor = false;
    let isFriend = false;
    let isFamily = false;
    let str = "";

    if (user) {
        const { visitCounts } = user;

        isVisitor = visitCounts < 3;
        isFriend = visitCounts >= 3 && visitCounts < 5;
        isFamily = visitCounts >= 5;

    } else {
         str = "There is no any user";
    }
    //news
    const newsSource = await fs.readFile(`./data/news.json`, 'utf-8');
    const newsData = JSON.parse(newsSource);

    //discounts
    const newsDiscounts = await fs.readFile(`./data/discounts.json`, 'utf-8');
    const discountsData = JSON.parse(newsDiscounts);

    //cars
    const carsSource = await fs.readFile(`./data/cars.json`, 'utf-8');
    const carsData = JSON.parse(carsSource);

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