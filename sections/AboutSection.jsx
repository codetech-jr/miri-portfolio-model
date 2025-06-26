// components/AboutSection.js
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { HiCheck } from 'react-icons/hi';
// <-- NUEVO: Importamos motion para las animaciones
import { motion } from 'framer-motion';

const defaultAboutData = {
  name: "Miri",
  imageUrl: "/assets/miri-about.jpg",
  bio: "Miri Hernández is a professional model based in New York with over 5 years of experience in the fashion industry. Her versatility and professionalism have made her a sought-after talent for editorial, commercial, and runway projects.",
  specialSkills: [
    "Acting (Theater & Commercial)",
    "Fluent in Spanish",
    "Swimming",
    "Ballet (15 years training)",
    "Yoga Instructor",
    "Horseback Riding",
  ],
  features: [
    { label: "Hair", value: "Black" },
    { label: "Ethnicity", value: "Latin (Venezuelan)" },
    { label: "Eyes", value: "Black" },
    { label: "Languages", value: "English, French, Spanish" },
  ],
  contactButtonText: "Contact for Booking",
  contactLink: "#contact",
};

export default function AboutSection({ data = defaultAboutData }) {
  const sectionBgColor = "bg-[#111111]";
  const mainTitleColor = "text-white";
  const bioTextColor = "text-[#A9A9A9]";
  const subheadingColor = "text-[#F8F8F8]";
  const listItemColor = "text-[#BDBDBD]";
  const checkmarkColor = "text-[#D4AFB9]";

  // <-- NUEVO: Variantes para la animación de elementos individuales
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Variantes para el contenedor de la columna de texto, para animar sus hijos en cascada
  const textColumnVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <motion.section
      id="about"
      className={`${sectionBgColor} py-16 md:py-24`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.2 }} // Anima el título, luego el grid
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <motion.h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 uppercase ${mainTitleColor}`}
          variants={itemVariants}
        >
          About {data.name}
        </motion.h2>

        <div className="grid items-start grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
          {/* Columna de la Imagen */}
          <motion.div
            className="w-full aspect-[3/4] relative rounded-lg overflow-hidden shadow-2xl mx-auto max-w-md md:max-w-none"
            variants={itemVariants}
          >
            <Image
              src={data.imageUrl}
              alt={`Portrait of ${data.name}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Columna de Texto */}
          <motion.div variants={textColumnVariants}>
            <motion.p
              className={`${bioTextColor} text-base md:text-lg leading-relaxed mb-10`}
              variants={itemVariants}
            >
              {data.bio}
            </motion.p>

            <motion.h3
              className={`${subheadingColor} text-xl font-semibold mb-4`}
              variants={itemVariants}
            >
              Special Skills
            </motion.h3>
            <motion.ul
              className="grid grid-cols-1 mb-10 sm:grid-cols-2 gap-x-6 gap-y-3"
              variants={itemVariants}
            >
              {data.specialSkills.map((skill, index) => (
                <li key={index} className={`flex items-start ${listItemColor}`}>
                  <HiCheck className={`w-5 h-5 mr-2 flex-shrink-0 ${checkmarkColor} mt-1`} />
                  <span>{skill}</span>
                </li>
              ))}
            </motion.ul>

            <motion.h3
              className={`${subheadingColor} text-xl font-semibold mb-4`}
              variants={itemVariants}
            >
              Features
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 mb-12 sm:grid-cols-2 gap-x-6 gap-y-3"
              variants={itemVariants}
            >
              {data.features.map((feature) => (
                <div key={feature.label} className={listItemColor}>
                  <span className={`font-medium ${mainTitleColor}`}>{feature.label}:</span> {feature.value}
                </div>
              ))}
            </motion.div>

            {data.contactButtonText && (
              <motion.div variants={itemVariants}>
                <Link
                  href={data.contactLink || '#'}
                  className={`
                    inline-block px-10 py-3 rounded-md
                    text-sm font-semibold uppercase tracking-wider
                    bg-[#D4AFB9] text-black
                    hover:bg-[#C8A2AD] 
                    transition-colors duration-300 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AFB9] focus:ring-offset-[#111111]
                  `}
                >
                  {data.contactButtonText}
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}