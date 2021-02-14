import React from 'react';
import {Menu, News} from '../../components';
import {initialDispatcher} from '../../init/initialDispatcher';
import {newsActions} from '../../bus/news';
import {initializeStore} from '../../init/store';
import {readFromData} from "../../helpers/readFromData";

const NewsPage = () => {
    return (
        <>
            <Menu />
            <News title= "🗞 News" />
        </>
    );
};

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    const newsSource = await readFromData(`./data/news.json`);
    const newsData =  JSON.parse(newsSource);
    store.dispatch(newsActions.fillNews(newsData));
    const initialReduxState = store.getState();
    return {
        props: {
            initialReduxState,
        },
    };
};

export default NewsPage;
