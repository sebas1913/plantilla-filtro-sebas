import React from "react";
import { Product } from "@/interfaces/IProduct";
import { CiHeart } from "react-icons/ci";
import Button from "@/components/UI/Button/Button";
import styles from './card.module.scss';
import styled from "styled-components";

interface CardProps {
    product: Product;
    onLike: () => void;
}


const Card: React.FC<CardProps> = ({ product, onLike }) => {
    return (
        <div className={styles.card}>
            <div className={styles.containerLike}>
                <Button type="button" onClick={onLike}>
                    <CiHeart size={30} />
                </Button>
            </div>
            <div className={styles.containerImage}>
                <img className={styles.image} src={product.image} alt="Product image" />
            </div>
            <h5 className={styles.title}>{product.title}</h5>
            <div className={styles.containerInfo}>
                <p><b>Categoría:</b> {product.category}</p>
                <p><b>Precio:</b> {product.price}</p>
                <p><b>Rating:</b> {product.rating.rate}</p>
                <p><b>Liked:</b> {product.isLiked ? 'True' : 'False'}</p>
            </div>
        </div>
    );
};

export default Card;
