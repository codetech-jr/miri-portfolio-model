// app/runway/page.tsx

"use client"; // <-- ¡MUY IMPORTANTE! para que las animaciones de Framer Motion funcionen

// <-- NUEVO: Importamos motion para la animación de página
import { motion } from 'framer-motion';
import RunwaySection from '@/components/RunwaySection';

// La metadata no se ve afectada, Next.js la maneja en el servidor
// export const metadata = {
//   title: 'Runway | Miri Hernández - Model',
//   description: "Miri Hernández's runway appearances and fashion show highlights.",
// };

const myRunwayShows = [
  {
    id: "showA",
    type: "video",
    title: "Exclusive Charity Gala 2024",
    thumbnailSrc: "/assets/gala-thumb.jpg",
    sources: [{ src: "/videos/runway/gala-show.mp4", type: "video/mp4" }],
    width: 1280,
    height: 720,
    description: "Featured model at the annual charity gala."
  },
  {
    id: "showB",
    type: "video",
    title: "Exclusive Charity Gala 2024",
    thumbnailSrc: "/assets/gala-thumb-2.jpg",
    sources: [{ src: "/videos/runway/gala-show-2.mp4", type: "video/mp4" }],
    width: 1280,
    height: 720,
    description: "Featured model at the annual charity gala."
  },
  {
    id: "showC",
    type: "video",
    title: "Exclusive Charity Gala 2024",
    thumbnailSrc: "/assets/gala-thumb-3.jpg",
    sources: [{ src: "/videos/runway/gala-show-3.mp4", type: "video/mp4" }],
    width: 1280,
    height: 720,
    description: "Featured model at the annual charity gala."
  },
  {
    id: "showD",
    type: "video",
    title: "Exclusive Charity Gala 2024",
    thumbnailSrc: "/assets/gala-thumb-3.jpg",
    sources: [{ src: "/videos/runway/gala-show-3.mp4", type: "video/mp4" }],
    width: 1280,
    height: 720,
    description: "Featured model at the annual charity gala."
  },
  {
    id: "showE",
    type: "video",
    title: "Exclusive Charity Gala 2024",
    thumbnailSrc: "/assets/gala-thumb-4.jpg",
    sources: [{ src: "/videos/runway/gala-show-4.mp4", type: "video/mp4" }],
    width: 1280,
    height: 720,
    description: "Featured model at the annual charity gala."
  },
  {
    id: "showF",
    type: "video",
    title: "Exclusive Charity Gala 2024",
    thumbnailSrc: "/assets/gala-thumb-5.jpg",
    sources: [{ src: "/videos/runway/gala-show-5.mp4", type: "video/mp4" }],
    width: 1280,
    height: 720,
    description: "Featured model at the annual charity gala."
  },
];

export default function RunwayPage() {
  return (
    // <-- MODIFICADO: Envolvemos el contenido de la página en un motion.div
    <motion.div
      initial={{ opacity: 0, y: 15 }} // Empieza transparente y ligeramente abajo
      animate={{ opacity: 1, y: 0 }}   // Termina totalmente visible y en su posición
      transition={{ duration: 0.7, ease: 'easeOut' }} // Duración y efecto de la animación
    >
      <RunwaySection items={myRunwayShows} />
    </motion.div>
  );
}