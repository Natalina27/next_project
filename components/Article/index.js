// Styles
import Styles from './styles.module.scss';

export const Article = ({ content, dateOfReceiving }) => {
    return (
        <div className={Styles.container}>
                <p>{content }</p>
            <p>Published: {dateOfReceiving}</p>
        </div>
    );
};
