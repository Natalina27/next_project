//Core
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

//Components
import { Article } from '../Article';

//Styles
import Styles from './styles.module.scss';

export const News = ({title}) => {
    const newsData = useSelector((state) => state.news);

    const newsDataJSX = newsData.map(item => <Article
        key={item.id}
        id={item.id}
        content={item.content}
        dateOfReceiving={item.dateOfReceiving}
    /> );

    return (
        <div className={Styles.container}>
            <Link href='/news'>
                <h2>
                    <a>{title}</a>
                </h2>
            </Link>
            {newsDataJSX}
        </div>
    );
};