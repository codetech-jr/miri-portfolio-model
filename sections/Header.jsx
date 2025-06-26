// Tu componente Hero, por ejemplo en components/Header.jsx
import React from "react";
import AnimatedLine from '../components/AnimatedLine';
import Link from 'next/link'; // Importamos Link para el botón

export default function Header() {
    // Definimos el nuevo contenido de texto
    const mainText = "Miri Hernández";
    const subText = "Showcasing passion and professionalism in every project.";

    return (
        // CONTENEDOR PRINCIPAL
        // 1. Añadimos un fondo con una imagen. ¡Recuerda cambiar la URL de la imagen!
        // 2. Usamos `grayscale` para aplicar el filtro en blanco y negro.
// Ejemplo con ajuste fino
            <section
                className="relative min-h-screen bg-[80%_20%] md:bg-center bg-cover grayscale" 
                style={{ backgroundImage: "url('/assets/miri-1.png')" }}
            >
            {/* OVERLAY */}
            {/* Este div se coloca sobre la imagen para oscurecerla y hacer el texto legible. */}
            <div className="absolute inset-0 bg-black/60" />

            {/* CONTENEDOR DEL CONTENIDO */}
            {/* Usamos `relative` para que el contenido se muestre sobre el overlay. */}
            <div className="relative flex flex-col items-center justify-center min-h-screen p-6 text-center sm:p-10">

                {/* TEXTO PRINCIPAL */}
                <AnimatedLine
                    delay={500}
                    duration={1000}
                >
                    <h1 className="font-serif text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
                        {mainText}
                    </h1>
                </AnimatedLine>

                {/* SUBTEXTO */}
                <AnimatedLine
                    delay={1200}
                    duration={800}
                >
                    {/* Usamos text-gray-200 que es un #E5E7EB, muy cercano al #E0E0E0 que pediste */}
                    <p className="max-w-xl mt-4 text-lg text-gray-200 md:text-xl font-lato">
                        {subText}
                    </p>
                </AnimatedLine>

                {/* BOTÓN "BOOK NOW" */}
                <AnimatedLine
                    delay={1800}
                    duration={800}
                    className="mt-8" // Margen superior para separar el botón del texto
                >
                    <Link
                        href="/#contact" // O a tu página de booking
                        className={`
                            inline-block px-10 py-3 
                            font-semibold text-sm uppercase tracking-widest
                            text-white               // Texto blanco
                            bg-transparent           // Fondo transparente
                            border border-[#D4AFB9]  // Borde con color de acento
                            transition-all duration-300 ease-in-out
                            hover:bg-[#D4AFB9]       // Fondo de acento en hover
                            hover:text-black         // Texto negro en hover para contraste
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#D4AFB9]
                        `}
                    >
                        Book Now
                    </Link>
                </AnimatedLine>

            </div>
        </section>
    );
}
