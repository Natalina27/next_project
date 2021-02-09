// Core
import Link from 'next/link';

// Components
import { Back } from '../Back';

// Styles
import Styles from './styles.module.scss';

export const Car = ({ single, id, content, dateOfReceiving }) => {
    return (
        <div className={Styles.container}>
            <Link href={`/cars/${id}`}>
                <p>
                    <a>{content}</a>
                </p>
            </Link>
            <p>Published: {dateOfReceiving}</p>
            {single && <Back />}
        </div>
    );
};