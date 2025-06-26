// components/HeroPortfolio.jsx
"use client"; // Necesitamos esto para las animaciones

import Image from 'next/image';
// <-- NUEVO: Importamos motion para las animaciones
import { motion } from 'framer-motion';

export default function HeroPortfolio({ imageUrl, title, subtitle }) {
  // <-- NUEVO: Definimos las variantes para la animación del texto
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // staggerChildren crea un retraso entre la animación del título y el subtítulo
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Empieza 20px abajo y transparente
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    // <-- MODIFICADO: La sección ahora es un motion.section para animar el fondo
    <motion.section
      className="relative flex items-center justify-center w-full h-screen text-center"
      // Animación de zoom sutil para el fondo
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <Image
        src={imageUrl}
        alt={title || "Portfolio"}
        fill
        className="z-0 object-cover grayscale"
        priority
      />

      <div className="absolute inset-0 z-10 bg-black/60"></div>
      
      {/* <-- MODIFICADO: Este div es el orquestador de la animación del texto */}
      <motion.div
        className="relative z-20 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: 0.5 }} // Espera un poco antes de animar el texto
      >
        {title && (
          // <-- MODIFICADO: El título es un elemento animado
          <motion.h1
            className="text-5xl font-bold text-white md:text-7xl drop-shadow-lg"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
        )}
        
        {subtitle && (
          // <-- MODIFICADO: El subtítulo es el segundo elemento animado
          <motion.p
            className="max-w-2xl mt-4 text-lg text-gray-200 md:text-xl drop-shadow-md"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.section>
  );
}