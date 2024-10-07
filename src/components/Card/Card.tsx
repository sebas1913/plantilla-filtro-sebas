import React from "react";
import { Product } from "@/interfaces/IProduct";
import styles from './card.module.scss'

interface CardProps {
    product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {

    return (
        <div className={styles.card}>
            <div className={styles.containerImage}>
                <img className={styles.image} src={product.image} alt="Product image" />
            </div>
            <h5 className={styles.title}>{product.title}</h5>
            <div className={styles.containerInfo}>
                {/* <p>{product.description}</p> */}
                <p><b>Categoría:</b>{product.category}</p>
                <p><b>Rating:</b>{product.rating.rate}</p>
                <p>{product.rating.count}</p>
                <p>{ }</p>
            </div>
        </div>
    );
};

export default Card;
