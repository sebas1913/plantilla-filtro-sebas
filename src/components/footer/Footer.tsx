"use client";
import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import styles from './footer.module.scss';


const Footer: React.FC = () => {
    return (
        <footer className={styles.footerContainer}>
            <a
                className={styles.socialLink}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <AiFillInstagram />
            </a>
            <a
                className={styles.socialLink}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaFacebookF />
            </a>
            <a
                className={styles.socialLink}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaLinkedinIn />
            </a>
        </footer >
    );
};

export default Footer;
