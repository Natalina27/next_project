//Core
import React from 'react';
import Link from 'next/link';
import {useSelector} from 'react-redux';

//Components
import {Back} from '../Back';

//Styles
import Styles from './styles.module.scss';

//Others
import {selectNews} from '../../bus/news';

export const News = ({title}) => {
    const news = useSelector(selectNews);

    const newsJSX = news.map(item =>
        <Link key={item.id} href={`/news/${item.id}`}>
            {`${item.content}-> Read more...`}
        </Link>);

    return (
        <div className={Styles.container}>
                <h2>{title}</h2>
                {newsJSX}
                <Back/>
        </div>
    );
};