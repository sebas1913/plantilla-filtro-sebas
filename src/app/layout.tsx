import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from "next-intl/server";
import { Raleway } from "next/font/google";
import SessionProviderWrapper from "@/components/provider/SessionProviderWrapper";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "../styles/globals.css";


const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prueba",
  description: "Prueba Sebastián Osorno C",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale(); 
  const messages = await getMessages(); 

  return (
    <html lang={locale}>
      <body className={raleway.className}>
        <SessionProviderWrapper>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <main>
            {children}

            </main>
            < Footer />
          </NextIntlClientProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
