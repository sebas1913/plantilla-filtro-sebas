"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";




const ProfilePage: React.FC = () =>{
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        } else if (status === "authenticated") {
            console.log(session);
            
        }
    }, [status, router]);

    return(
        <div>
            <h1>Perfil de usuario</h1>
        </div>
    )
}

export default ProfilePage;