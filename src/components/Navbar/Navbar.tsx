"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import styles from './Navbar.module.scss'
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "../UI/Button/Button";
import Input from '../UI/Input/Input';
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";



const StyledButton = styled(Button)`
    margin: 0.8rem;
    width: 8rem;
    padding: 0.6rem;
    color: var(--tertiary-color);
    background: var(--primary-color);
`;


const Navbar: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [modalLoginVisible, setModalLoginVisible] = useState(false);
    const [selectedUsernameLogin, setSelectedUsernameLogin] = useState('');
    const [selectedPasswordLogin, setSelectedPasswordLogin] = useState('');

    const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
    const [selectedEmailRegister, setSelectedEmailRegister] = useState('');
    const [selectedNameRegister, setSelectedNameRegister] = useState('');
    const [selectedUsernameRegister, setSelectedUsernameRegister] = useState('');
    const [selectedPasswordRegister, setSelectedPasswordRegister] = useState('');
    const [selectedPhoneRegister, setSelectedPhoneRegister] = useState('');

    const toggleModalLogin = () => {
        setModalLoginVisible(!modalLoginVisible);
    };

    const toggleModalRegister = () => {
        setModalRegisterVisible(!modalRegisterVisible);
    };


    const handleChangeNameRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedNameRegister(event.target.value);
    };

    const handleChangeEmailRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEmailRegister(event.target.value);
    };

    const handleChangePasswordRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPasswordRegister(event.target.value);
    };

    const handleChangeUsernameRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedUsernameRegister(event.target.value);
    }

    const handleChangePhoneRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPhoneRegister(event.target.value);
    }


    const handleChangeUsernameLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedUsernameLogin(event.target.value);
    };

    const handleChangePasswordLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPasswordLogin(event.target.value);
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            username: selectedUsernameLogin,
            password: selectedPasswordLogin
        });

        console.log(session);


        if (result?.error) {
            console.log("Error de autenticación:", result.error);
            alert(`Credenciales incorrectas: ${result.error}`);
        } else {
            console.log("Inicio de sesión exitoso");

            const session = await getSession();

            if (session) {
                router.push("/products");
                setModalLoginVisible(false);
                setSelectedUsernameLogin('');
                setSelectedPasswordLogin('');
            } else {
                console.error("No se pudo obtener la sesión después del inicio de sesión.");
                alert("Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo.");
            }
        }
    };


    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: selectedNameRegister,
                    email: selectedEmailRegister,
                    password: selectedPasswordRegister,
                    username: selectedUsernameRegister,
                    phone: selectedPhoneRegister
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error en el registro:", errorData.message);
                alert(`Error en el registro: ${errorData.message}`);
                return;
            }

            const data = await response.json();
            alert("Usuario registrado exitosamente :)");
            toggleModalRegister(); 

            setSelectedNameRegister('');
            setSelectedEmailRegister('');
            setSelectedPasswordRegister('');

        } catch (error) {
            console.error("Error al registrar:", error);
            alert("Ocurrió un error al registrar. Por favor, intenta de nuevo.");
        }
    };



    return (
        <>
            <nav className={styles.StyledNav}>
                {status === "authenticated" ? (

                    <>
                        <h1>RIWI STORE</h1>
                        <div>
                            <StyledButton type="button">
                                < FaUser size={25} />
                            </StyledButton>
                            <StyledButton type="button" onClick={async () => await signOut()}>
                                < CiLogout size={25} />
                            </StyledButton>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>RIWI STORE</h1>
                        <div>
                            <StyledButton type="button" onClick={toggleModalLogin}>
                                Iniciar sesión
                            </StyledButton>
                            <StyledButton type="button" onClick={toggleModalRegister}>
                                Registrarse
                            </StyledButton>
                        </div>
                    </>
                )}
            </nav>

            {/* Modal de inicio de sesión */}
            {!session && (
                <>
                    <Modal isVisible={modalLoginVisible} onClose={toggleModalLogin}>
                        <Form onSubmit={handleLoginSubmit}>
                            <h1>Iniciar sesión</h1>
                            <Input
                                type="text"
                                name="username"
                                value={selectedUsernameLogin}
                                onChange={handleChangeUsernameLogin}
                                placeholder="Nombre de usuario"
                            />
                            <Input
                                type="password"
                                name="password"
                                value={selectedPasswordLogin}
                                onChange={handleChangePasswordLogin}
                                placeholder="Contraseña"
                            />
                            <div className={styles.StyledContainerButton}>
                                <StyledButton type="submit">Enviar</StyledButton>
                            </div>
                        </Form>
                    </Modal>

                    <Modal isVisible={modalRegisterVisible} onClose={toggleModalRegister}>
                        <Form onSubmit={handleRegisterSubmit}>
                            <h1>Regístrate</h1>
                            <Input
                                type="text"
                                name="name"
                                value={selectedNameRegister}
                                onChange={handleChangeNameRegister}
                                placeholder="Nombre completo"
                            />
                            <Input
                                type="email"
                                name="email"
                                value={selectedEmailRegister}
                                onChange={handleChangeEmailRegister}
                                placeholder="Correo electrónico"
                            />
                            <Input
                                type="text"
                                name="username"
                                value={selectedUsernameRegister}
                                onChange={handleChangeUsernameRegister}
                                placeholder="Nombre de usuario"
                            />
                            <Input
                                type="password"
                                name="password"
                                value={selectedPasswordRegister}
                                onChange={handleChangePasswordRegister}
                                placeholder="Contraseña"
                            />
                            <Input
                                type="text"
                                name="phone"
                                value={selectedPhoneRegister}
                                onChange={handleChangePhoneRegister}
                                placeholder="Teléfono"
                            />
                            <div className={styles.StyledContainerButton}>
                                <StyledButton type="submit">Enviar</StyledButton>
                            </div>
                        </Form>
                    </Modal>
                </>
            )}
        </>
    );
};

export default Navbar;
