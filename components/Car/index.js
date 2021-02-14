// Core
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';

// Components
import { Back } from '../Back';

//Selectors
import {selectCarById} from '../../bus/cars';

// Styles
import Styles from './styles.module.scss';

export const Car = ({ single, carId }) => {
    const { query } = useRouter();
    const id = query.id || carId;
    const { id: carIds, content, dateOfReceiving } = useSelector(selectCarById(id));

    return (
        <div className={Styles.container}>
            <Link href={`/cars/${carIds}`}>
                <p>
                    <a>{content}</a>
                </p>
            </Link>
            <p>Published: {dateOfReceiving}</p>
            {single && <Back />}
        </div>
    );
};