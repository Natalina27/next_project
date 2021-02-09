//Core
import React from 'react';
import {useSelector} from 'react-redux';
import Link from 'next/link';

//Components
import {Car} from '../Car';

//Styles
import Styles from '../Cars/styles.module.scss';

export const Cars = ({title}) => {
    const carsData = useSelector((state) => state.cars);

    const carsDataJSX = carsData.map(item => <Car
        key={item.id}
        id={item.id}
        content={item.content}
        dateOfReceiving={item.dateOfReceiving}
    />);

    return (
        <div className={Styles.container}>
            <Link href='/cars'>
                <h2>
                    <a>{ title }</a>
                </h2>
            </Link>
            {carsDataJSX}
        </div>
    );
};
