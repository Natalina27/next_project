//Core
import React from 'react';
import Link from 'next/link';

//Styles
import Styles from './styles.module.scss';
import {useSelector} from "react-redux";
import {Discount} from "../Discount";

export const Discounts = ({title}) => {
    const discountsData = useSelector((state) => state.discount);

    const discountsDataJSX = discountsData.map(item => {
        return(
            <Discount
                key={item.id}
                id={item.content}
                dateOfReceiving={item.dateOfReceiving}
            />);
    });
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