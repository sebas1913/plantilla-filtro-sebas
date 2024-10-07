"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from './profile.module.scss'


const ProfilePage: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        } else if (status === "authenticated") {
            console.log(session);

        }
    }, [status, router]);


    return (
        <>
            <div className={styles.containerProfile}>
                <h1 className={styles.title}>Perfil de usuario</h1>
                <div className={styles.containerInfo}>
                    <p><b>Nombre completo:</b> {session?.user.name}</p>
                    <p><b>Correo electrónico:</b> {session?.user.email}</p>
                    <p><b>Nombre de usuario:</b> {session?.user.username}</p>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;