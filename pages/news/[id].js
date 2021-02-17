// Core
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

// Components
import { Menu, Article, Back } from '../../components';

// Actions
import { newsActions, selectNews } from '../../bus/news';

// Other
import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';
import { readNews } from '../../helpers/readData';

const ArticleByIdPage = () => {
    const news = useSelector(selectNews);
    const router = useRouter();
    const { id } = router.query;
    const article = news.find((item) => item.id === id);
    const { content, dateOfReceiving } = article;

    return (
        <>
            <Menu />
            <Article id={id}
                     content={content}
                     dateOfReceiving={dateOfReceiving}
                     />
            <Back />
        </>
    );
};

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore());
    const  newsData  = await readNews();
    store.dispatch(newsActions.fillNews(newsData));
    const initialReduxState = store.getState();

    return {
        props: {
            initialReduxState
        },
    };
};

export default ArticleByIdPage;