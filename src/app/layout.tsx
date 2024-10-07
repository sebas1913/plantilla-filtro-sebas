import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
// import { getLocale, getMessages } from "next-intl/server";
import { Raleway } from "next/font/google";
import SessionProviderWrapper from "@/components/provider/SessionProviderWrapper";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "../styles/globals.css";


const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simulacro",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Obtener el idioma y los mensajes de traducción
  // const locale = await getLocale(); 
  // const messages = await getMessages(); // Pasamos el locale para obtener los mensajes correctos

  return (
    // <html lang={locale}>

    <html lang="es">
      <body className={raleway.className}>
        <SessionProviderWrapper>
          {/* <NextIntlClientProvider locale={locale} messages={messages}> */}
            <Navbar />
            <main>
            {children}

            </main>
            < Footer />
          {/* </NextIntlClientProvider> */}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
