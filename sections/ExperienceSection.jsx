// components/ExperienceSection.js
"use client";
import Image from 'next/image';
// <-- NUEVO: Importamos motion para las animaciones
import { motion } from "framer-motion";

const defaultCollaborations = [
  { name: "NXTone", id: "nxtone", logoSrc: "/assets/marca1.png", width: 150, height: 40, websiteUrl: "https://www.instagram.com/nexttt.one/" },
  { name: "CollectiveIndia", id: "collectiveindia", logoSrc: "/assets/marca2.jpeg", width: 130, height: 35, websiteUrl: "https://thecollective.in/" },
  { name: "EONE", id: "eone", logoSrc: "/assets/marca3.png", width: 100, height: 50, websiteUrl: "https://eone-time.com/" },
  { name: "Shein", id: "shein", logoSrc: "/assets/marca4.jpeg", width: 160, height: 30, websiteUrl: "https://www.shein.com/" },
  { name: "GRENDHA", id: "grendha", logoSrc: "/assets/marca5.png", width: 160, height: 30, websiteUrl: "https://www.instagram.com/grendha/" },
  { name: "TEILOR", id: "teilor", logoSrc: "/assets/marca6.jpg", width: 160, height: 30, websiteUrl: "https://www.teilor.com/" },
  { name: "KERO DESIGN", id: "kero", logoSrc: "/assets/marca7.jpg", width: 80, height: 25, websiteUrl: "https://www.facebook.com/kerodesignperu/" },
];

export default function ExperienceSection({
  title = "Experience & Collaborations",
  collaborations = defaultCollaborations,
}) {
  const sectionBgColor = "bg-[#F8F8F8]";
  const titleTextColor = "text-[#2D2D2D]";
  const duplicatedCollaborations = [...collaborations, ...collaborations];

  // <-- NUEVO: Definimos las variantes para la animación de entrada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Retraso entre la animación del título y la marquesina
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 }, // Empieza 30px abajo y transparente
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    // <-- MODIFICADO: La sección es ahora el contenedor que dispara la animación
    <motion.section
      className={`${sectionBgColor} py-16 md:py-20 lg:py-24`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Anima una vez, cuando el 20% es visible
    >
      <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
        {/* <-- MODIFICADO: El título es el primer elemento animado */}
        <motion.h2
          className={`${titleTextColor} text-2xl sm:text-3xl font-bold mb-10 md:mb-14 uppercase tracking-wider`}
          variants={itemVariants}
        >
          {title}
        </motion.h2>
      </div>

      {/* <-- MODIFICADO: La marquesina es el segundo elemento animado */}
      <motion.div
        className="w-full overflow-x-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        variants={itemVariants}
      >
        {/* El efecto de marquee se mantiene, con pausa en hover */}
        <div className="flex animate-[marquee_30s_linear_infinite] hover:pause whitespace-nowrap">
          {duplicatedCollaborations.map((collab, index) => (
            <div
              key={`${collab.id}-${index}`}
              className="flex-shrink-0 mx-8 sm:mx-10 md:mx-14"
            >
              <a
                href={collab.websiteUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${collab.name} website`}
                className={`block ${collab.websiteUrl ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <Image
                  src={collab.logoSrc}
                  alt={`${collab.name} logo`}
                  width={collab.width || 140}
                  height={collab.height || 40}
                  className={`
                    object-contain max-h-8 sm:max-h-10 
                    grayscale hover:grayscale-0 
                    transition-all duration-300 ease-in-out
                  `}
                />
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}