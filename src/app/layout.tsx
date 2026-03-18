import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yada - Desarrollo Web y Soluciones Digitales",
  description: "Transformamos ideas en productos digitales escalables y modernos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-black text-black dark:text-white antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
