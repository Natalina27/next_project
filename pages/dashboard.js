import {initialDispatcher} from "../init/initialDispatcher";
import {initializeStore} from "../init/store";
import {Cars, Discounts, Menu, News} from "../components";
import {useSelector} from "react-redux";
import {selectUser} from "../bus/user";
import React from "react";


const Dashboard = () => {
    const  user = useSelector(selectUser);
    const { userType, visitCounts } = user;
    //const visitCounts =  countUserVisits(user);


    const isVisitor = userType === 'Guest';
    const isFriend = userType === 'Friend';
    const isFamily = userType === 'familyMember';

    const visitorJSX = isVisitor || isFriend ||  isFamily  && <News title= "🗞 News" />;
    const friendJSX = isFriend || isFamily &&  <Discounts title='📉 Discounts' />;
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
    const store = await initialDispatcher(context, initializeStore());
    const initialReduxState = store.getState();

    return {
        props: {
            initialReduxState,
        },
    };
};

export default Dashboard;