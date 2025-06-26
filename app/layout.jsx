import { Playfair_Display } from "next/font/google";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";

const playfair = Playfair_Display({
    variable: "--font-text",
    weight: ["400"],
    subsets: ["latin"]
});

const lato = Lato({
    variable: "--font-primary",
    weight: ["400"],
    subsets: ["latin"]
});



export const metadata = {
  title: "Miri",
  description: "Transforma tu negocio con una identidad de marca potente. Diseño de logos creativos y consultoría estratégica para que tu marca destaque y conecte.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${playfair.variable} text-white antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
