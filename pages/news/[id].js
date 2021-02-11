// Core
import { useRouter } from 'next/router';

// Components
import { Menu, Article } from '../../components';

// Actions
import {newsActions} from '../../bus/news';

// Other
import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';

const ArticleByIdPage = ({ initialReduxState: { news = [] } }) => {
    const router = useRouter();
    const { id } = router.query;
    const article = news.find((item) => item.id === id);

    return (
        <>
            <Menu />
            { article && <Article single { ...article } /> }
        </>
    );
};

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    const initialReduxState = store.getState();
    const { newsData } = initialReduxState;
    store.dispatch(newsActions.fillCars(newsData));

    return {
        props: {
            initialReduxState: {
                news: newsData,
            },
        },
    };
};


export default ArticleByIdPage;