import React from "react";
import { IoStorefront } from "react-icons/io5";
import styles from './Home.module.scss';

const HomeInformation: React.FC = () => {
    return (
        <div className={styles.informationContainer}>
            <div className={styles.containerLeft}>
                <h1 className={styles.title}>Riwi Store</h1>
                <p className={styles.admiration}>Bienvenido, en <b>Riwi Store</b> encontrarás los mejores productos del mercado, ¡Inicia sesión y descúbrelo!</p>
            </div>
            <div className={styles.containerRight}>
                < IoStorefront size={180} color="#000000"/>
            </div>
        </div>
    );
};

export default HomeInformation;