//Core
import React from 'react';
import Link from 'next/link';

//Styles
import Styles from './styles.module.scss';

export const Menu = () => {
    return (
        < >
            <nav className={Styles.menu}>
                <Link href={'/'}>
                    <a > Home  | </a>
                </Link>
                <Link href={'/user'}>
                    <a >  User  | </a>
                </Link>
                <Link href={'/dashboard'}>
                    <a>  Dashboard </a>
                </Link>
            </nav>
        </>
    );
};
