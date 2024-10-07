"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from './products.module.scss'


const ProductsPage: React.FC = () =>{
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<any[]>([]);
    const router = useRouter();
    

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        } else if (status === "authenticated") {
            fetchProducts();
            console.log(fetchProducts);
            
        }
    }, [status, router]);


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
                console.log(data);
                
            } else {
                console.error("Error fetching products:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className={styles.containerProducts}>
            <h1 className={styles.title}>Products</h1>
        </div>
    )
}

export default ProductsPage;