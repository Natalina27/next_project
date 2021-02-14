//Core
import React from 'react';
import Link from 'next/link';

//Styles
import Styles from './styles.module.scss';

export const Discounts = ({title}) => {

    return (
        <div className={Styles.container}>
            <Link href='/discounts'>
                <h2>
                    <a>{title}</a>
                </h2>
            </Link>
        </div>
    );
};