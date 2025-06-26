import React from "react";
import AnimatedLine from '../components/AnimatedLine'; // Asegúrate de que este componente esté funcionando como esperas

export default function Hero() {
    const definingLuxuryText = "DISCOVER MIRI HERNANDEZ'S INCREDIBLE PORTFOLIO, WHERE PASSION AND PROFESSIONALISM COME TOGETHER TO CREATE SOMETHING TRULY EXTRAORDINARY!"; // Puesto en mayúsculas como en la imagen
    const line2Content = "Miri, a commercial beauty specialist, has collaborated with brands such as Shein.";
    const line3Content = "I invite you to discover how my work can elevate your next campaign."; // Quitada la tilde para consistencia o añádela a "próxima"

    return (
        // Contenedor principal de la sección Hero
        <section className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-gray-300 bg-black sm:px-6 md:py-20">
            {/* Contenedor para centrar y limitar el ancho del contenido */}
            <div className="w-full max-w-xl text-center md:max-w-2xl lg:max-w-3xl"> {/* Ajusta max-w-* según tu preferencia */}
                
                {/* Texto "DEFINING LUXURY" */}
                <AnimatedLine
                    delay={200}
                    duration={1000}
                    // Clases para este texto: más pequeño, espaciado, mayúsculas
                    className="text-xs sm:text-sm text-gray-400 mb-10 sm:mb-12 md:mb-16 tracking-[0.2em] sm:tracking-[0.25em] uppercase font-lato" 
                >
                    {definingLuxuryText}
                </AnimatedLine>

                {/* Bloque de texto principal animado */}
                {/* El text-center ya está en el div padre, pero podemos ser explícitos si queremos */}
                <div className="text-xl leading-snug text-gray-200 sm:text-2xl md:text-3xl lg:text-4xl md:leading-tight font-playfair"> 
                    <AnimatedLine
                        delay={1300}
                        duration={800}
                        className="mb-4 sm:mb-6" // Aumentado un poco el margen inferior
                    >
                        {line2Content}
                    </AnimatedLine>
                    <AnimatedLine
                        delay={1800}
                        duration={800}
                    >
                        {line3Content}
                    </AnimatedLine>
                </div>
            </div>
        </section>
    );
}