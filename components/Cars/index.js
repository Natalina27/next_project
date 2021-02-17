//Core
import React from 'react';
import Link from 'next/link';
import {useSelector} from 'react-redux';

//Components
import {Back} from '../Back';

//Styles
import Styles from '../Cars/styles.module.scss';

//Others
import {selectCars} from '../../bus/cars';

export const Cars = ({title}) => {
    const cars = useSelector(selectCars);

    const carsJSX = cars.map(item =>
        <Link key={item.id} href={`/cars/${item.id}`}>
            {`${item.content}-> Read more...`}
        </Link>);

    return (
        <div className={Styles.container}>
            <h2>{ title }</h2>
            {carsJSX}
            <Back/>
        </div>
    );
};
