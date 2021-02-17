//Core
import React from 'react';

//Components
import { Menu, News } from '../../components';

//Actions
import { newsActions } from '../../bus/news';

//Others
import { initialDispatcher } from '../../init/initialDispatcher';
import { initializeStore } from '../../init/store';
import { readNews } from '../../helpers/readData';

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
    const newsData =  await readNews();
    store.dispatch(newsActions.fillNews(newsData));
    const initialReduxState = store.getState();

    return {
        props: {
            initialReduxState,
        },
    };
};

export default NewsPage;
