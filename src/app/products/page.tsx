"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; 
import styled from "styled-components";
import styles from './products.module.scss';
import Spinner from "@/components/Spinner/Spinner";
import Card from "@/components/Card/Card";
import Button from "@/components/UI/Button/Button";
import { URL_BASE } from "../../../URL_BASE";


const StyledButtonLang = styled(Button)`
    margin: 0.2rem;
    width: 3rem;
    padding: 0.6rem;
    color: var(--tertiary-color);
    background: var(--primary-color);
`


const ProductsPage: React.FC = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<any[]>([]);
    const router = useRouter();
    const [language, setLanguage] = useState<string>('en');
    const [texts, setTexts] = useState<any>({});


    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        } else if (status === "authenticated") {
            fetchProducts();
            loadLanguage();
        }
    }, [status, router]);

    const loadLanguage = () => {
        const lang = Cookies.get('language') || 'es';
        setLanguage(lang);
        fetch(`/messages/${lang}.json`)
            .then(response => response.json())
            .then(data => setTexts(data));
    };

    const changeLanguage = (lang: string): void => {
        Cookies.set('language', lang, { expires: 30 });
        loadLanguage();
    };


    const fetchProducts = async (): Promise<void> => {
        setLoading(true);

        try {
            const response = await fetch("/api/products", {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${session!.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data)

            } else {
                console.error("Error fetching products:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLikes = async (productId: string): Promise<void> => {
        try {
            const response = await fetch(`${URL_BASE}/auth/products/${productId}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session!.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); 
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error :( ", error);
        }
    };


    if (status === "loading" || loading) {
        return <Spinner />;
    }


    return (
        <>
            <div className={styles.containerProducts}>
                <h1 className={styles.title}>{texts.title}</h1>
                {products.map((product) => (
                    <Card
                        key={product.id}
                        product={product}
                        onLike={() => fetchLikes(product.id)}
                    />
                ))}
            </div>
            <div className={styles.containerLanguages}>
                <StyledButtonLang type="button" onClick={() => changeLanguage('es')}>ES</StyledButtonLang>
                <StyledButtonLang type="button" onClick={() => changeLanguage('en')}>EN</StyledButtonLang>
            </div>
        </>
    )
}

export default ProductsPage;