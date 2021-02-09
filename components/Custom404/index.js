// Core
import NextLink from 'next/link';

// Styles
import Styles from './styles.module.scss';

export const Custom404 = () => {
    return (
        <section className={Styles.container}>
            <h1>Error 404!</h1>
            <h2>
                🌲 It seems, <span>you are lost in the forest</span>. 🌲
            </h2>
            <p>
                <NextLink href="/">
                    <a>🕊 EXIT... 🪶</a>
                </NextLink>
            </p>
        </section>
    );
};