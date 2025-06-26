// components/Lightbox.js
"use client";
import Image from 'next/image';
// <-- NUEVO: Importamos motion para las animaciones
import { motion } from 'framer-motion';

// <-- NUEVO: Definimos las variantes de animación para reutilizarlas
const backdropVariants = {
  // Estado visible: El fondo es opaco
  visible: { opacity: 1 },
  // Estado oculto (o de salida): El fondo es transparente
  hidden: { opacity: 0 },
};

const modalVariants = {
  // Estado oculto: La imagen está escalada hacia abajo y es transparente
  hidden: {
    y: "-50%", // Lo centramos verticalmente
    scale: 0.8,
    opacity: 0,
  },
  // Estado visible: La imagen está en su tamaño y opacidad normales
  visible: {
    y: "-50%",
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring', // Una animación de resorte para un efecto 'pop' suave
      stiffness: 300,
      damping: 30,
    },
  },
  // Estado de salida: Vuelve a su estado oculto
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};


export default function Lightbox({ src, alt, onClose }) {
  return (
    // <-- MODIFICADO: El contenedor principal es ahora un motion.div que anima el fondo
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      onClick={onClose}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Esta es la animación de salida
    >
      {/* <-- MODIFICADO: El contenedor de la imagen también es un motion.div para su propia animación */}
      <motion.div
        className="relative w-11/12 max-w-4xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el lightbox
        variants={modalVariants}
        // initial, animate y exit son heredados de su padre (backdrop)
        // pero definimos una variante de salida específica para el modal
        exit="exit"
        // Lo posicionamos para que el 'y' funcione correctamente
        style={{ top: "50%" }}
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          className="object-contain w-full h-full rounded-lg"
        />
      </motion.div>

      <button
        onClick={onClose}
        className="absolute text-3xl font-bold text-white transition-colors top-4 right-4 hover:text-gray-300"
        aria-label="Cerrar imagen"
      >
        ×
      </button>
    </motion.div>
  );
}