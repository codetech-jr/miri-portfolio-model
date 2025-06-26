// components/ModelStatsSection.js
"use client";

// <-- NUEVO: Importamos motion para las animaciones
import { motion } from "framer-motion";

// Datos de ejemplo
const measurementsData = [
  { label: "Height", value: "5'11\" / 1,74cm" },
  { label: "Body Measurements", value: "83/62/91" },
  { label: "Hair", value: "Black" },
  { label: "Eyes", value: "Black" },
  { label: "Shoe", value: "8.5 US / 39 EU" },
];

export default function ModelStatsSection({ measurements = measurementsData }) {
  const sectionBgColor = "bg-[#111111]";
  const labelColor = "text-white";
  const valueColor = "text-[#A9A9A9]";

  // <-- NUEVO: Definimos las variantes para la animación en cascada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // staggerChildren crea un pequeño retraso entre la animación de cada hijo
        staggerChildren: 0.1,
      },
    },
  };

  // Variante para cada una de las estadísticas individuales
  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Empieza 20px abajo y transparente
    visible: { y: 0, opacity: 1 },  // Termina en su posición original y visible
  };

  return (
    // La sección entera se vuelve el trigger de la animación
    <motion.section
      initial="hidden"
      whileInView="visible" // La animación se activa cuando la sección entra en la pantalla
      viewport={{ once: true, amount: 0.3 }} // Anima una sola vez, cuando el 30% es visible
      className={`${sectionBgColor} py-16 md:py-20`}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* <-- MODIFICADO: Este div es ahora el contenedor que orquesta la animación */}
        <motion.div
          className="grid grid-cols-2 text-center sm:grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-4"
          variants={containerVariants} // Le pasamos las variantes del contenedor
        >
          {measurements.map((stat) => (
            // <-- MODIFICADO: Cada estadística es ahora un motion.div
            <motion.div key={stat.label} variants={itemVariants}>
              <h3 className={`${labelColor} text-sm uppercase tracking-wider font-semibold mb-2`}>
                {stat.label}
              </h3>
              <p className={`${valueColor} text-base md:text-lg font-light`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}