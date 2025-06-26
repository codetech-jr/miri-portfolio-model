"use client";

import Image from 'next/image';
import Link from 'next/link';
// <-- NUEVO: Importamos motion para las animaciones
import { motion } from 'framer-motion';

interface WorkItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

const workItems: WorkItem[] = [
  { id: '1', src: '/assets/miri-2.jpg', alt: 'Model in a dark off-shoulder top', width: 800, height: 1200 },
  { id: '2', src: '/assets/miri-3.jpg', alt: 'Model in a white blazer, portrait', width: 800, height: 1200 },
  { id: '3', src: '/assets/miri-4.jpg', alt: 'Model in a full white suit, standing', width: 800, height: 1200 },
];

const FeaturedWork = () => {
  // <-- NUEVO: Definimos las variantes para la animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // staggerChildren crea un retraso entre la animación de cada hijo
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Empieza 20px abajo y transparente
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-[#F8F8F8] py-16 md:py-20 lg:py-24">
      {/* <-- MODIFICADO: Este div es el disparador y orquestador de toda la animación */}
      <motion.div
        className="container px-4 mx-auto sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // Anima una sola vez, cuando el 10% es visible
        variants={containerVariants}
      >
        {/* <-- MODIFICADO: El título ahora es un elemento de la animación */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-10 md:mb-14 text-center"
          variants={itemVariants as any}
        >
          THESE WORKS ARE EXCEPTIONAL
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
          variants={containerVariants}
        >
          {workItems.map((item) => (
            // <-- MODIFICADO: Cada tarjeta es ahora un elemento de la animación
            <motion.div
              key={item.id}
              className="group relative aspect-[2/3] overflow-hidden rounded-lg 
                         bg-white shadow-md hover:shadow-xl 
                         border border-gray-200 group-hover:border-[#D4AFB9]
                         transition-all duration-300 ease-in-out"
              variants={itemVariants as any}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                priority={item.id === '1'}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* <-- MODIFICADO: El contenedor del botón también es un elemento animado */}
        <motion.div className="mt-12 text-center md:mt-16" variants={itemVariants as any}>
          <Link
            href="/portfolio"
            className={`
              inline-block py-3 px-10 rounded-md
              text-sm font-semibold uppercase tracking-wider
              bg-[#D4AFB9] text-black
              hover:bg-[#C8A2AD] 
              transition-colors duration-300 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AFB9] focus:ring-offset-[#F8F8F8]
            `}
          >
            MY OTHER WORKS CAN BE SEEN HERE
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedWork;