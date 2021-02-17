//Core
import React from 'react';
import Link from 'next/link';
import {useSelector} from 'react-redux';

//Components
import {Back} from '../Back';

//Styles
import Styles from '../Cars/styles.module.scss';

//Others
import {selectDiscounts} from '../../bus/discounts';

export const Discounts = ({title}) => {
    const discounts = useSelector(selectDiscounts);

    const discountsJSX = discounts.map(item =>
        <Link key={item.id} href={`/discounts/${item.id}`}>
            {`${item.content}-> Read more...`}
        </Link>);

    return (
        <div className={Styles.container}>
            <h2>{ title }</h2>
            {discountsJSX}
            <Back/>
        </div>
    );
};