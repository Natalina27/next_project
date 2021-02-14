//Core
import React from 'react';
import Link from 'next/link';

//Styles
import Styles from '../Cars/styles.module.scss';

export const Cars = ({title}) => {
    return (
        <div className={Styles.container}>
            <Link href='/cars'>
                <h2>
                    <a>{ title }</a>
                </h2>
            </Link>
        </div>
    );
};
