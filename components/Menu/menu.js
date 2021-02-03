//Core
import React from 'react';
import Link from "next/link";

//Styles
import Styles from './styles.module.css';

export const Menu = () => {
    return (
        <div className={Styles.menu}>
            <nav>
                <Link href="/">
                    <a className={Styles.link}> Home  |</a>
                </Link>
                <Link href={"/user"}>
                    <a className={Styles.link}> User  |</a>
                </Link>
                <Link href={"/dashboard"}>
                    <a className={Styles.link}> Dashboard </a>
                </Link>
            </nav>
        </div>
    );
};
