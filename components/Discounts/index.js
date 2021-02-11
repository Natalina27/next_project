//Core
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

//Components
import { Discount } from '../Discount';

//Styles
import Styles from './styles.module.scss';

export const Discounts = ({title}) => {
    const discountsData = useSelector((state) => state.discounts);

    const discountsDataJSX = discountsData.map(item => <Discount
                key={item.id}
                id={item.content}
                content={item.content}
                dateOfReceiving={item.dateOfReceiving}
            />);

    return (
        <div className={Styles.container}>
            <Link href='/discounts'>
                <h2>
                    <a>{title}</a>
                </h2>
            </Link>
            {discountsDataJSX}
        </div>
    );
};