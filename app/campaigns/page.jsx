// app/campaigns/page.tsx

"use client"; // <-- ¡MUY IMPORTANTE! Para usar animaciones de cliente
// <-- NUEVO: Importamos motion para la animación de página
import { motion } from 'framer-motion';
import CampaignsSection from '@/components/CampaignsSection';

// La metadata no se ve afectada, Next.js la maneja en el servidor
// export const metadata = {
//     title: 'Campaign Films | Miri Hernández - Model',
//     description: "Featured campaign films and video advertisements by Miri Hernández.",
// };

const myCampaignVideos = [
  {
    id: "brandX-film-fall23",
    type: "video",
    brand: "Brand X",
    title: "Autumn Whispers - Campaign Film",
    thumbnailSrc: "/assets/campaign-thumb.jpg",
    sources: [{ src: "/videos/campaign.mp4", type: "video/mp4" }],
    width: 1920,
    height: 1080,
    description: "Ethereal campaign film for Brand X's Autumn Collection."
  },
  {
    id: "brandX-film-fall24",
    type: "video",
    brand: "Brand X",
    title: "Autumn Whispers - Campaign Film",
    thumbnailSrc: "/assets/campaign-thumb-2.jpg",
    sources: [{ src: "/videos/campaign-2.mp4", type: "video/mp4" }],
    width: 1920,
    height: 1080,
    description: "Ethereal campaign film for Brand X's Autumn Collection."
  },
  {
    id: "brandX-film-fall25",
    type: "video",
    brand: "Brand X",
    title: "Autumn Whispers - Campaign Film",
    thumbnailSrc: "/assets/campaign-thumb-3.jpg",
    sources: [{ src: "/videos/campaign-3.mp4", type: "video/mp4" }],
    width: 1920,
    height: 1080,
    description: "Ethereal campaign film for Brand X's Autumn Collection."
  },
  {
    id: "brandX-film-fall26",
    type: "video",
    brand: "Brand X",
    title: "Autumn Whispers - Campaign Film",
    thumbnailSrc: "/assets/campaign-thumb-4.jpg",
    sources: [{ src: "/videos/campaign-4.mp4", type: "video/mp4" }],
    width: 1920,
    height: 1080,
    description: "Ethereal campaign film for Brand X's Autumn Collection."
  },
  {
    id: "brandX-film-fall27",
    type: "video",
    brand: "Brand X",
    title: "Autumn Whispers - Campaign Film",
    thumbnailSrc: "/assets/campaign-thumb-5.jpg",
    sources: [{ src: "/videos/campaign-5.mp4", type: "video/mp4" }],
    width: 1920,
    height: 1080,
    description: "Ethereal campaign film for Brand X's Autumn Collection."
  },
  {
    id: "brandX-film-fall28",
    type: "video",
    brand: "Brand X",
    title: "Autumn Whispers - Campaign Film",
    thumbnailSrc: "/assets/campaign-thumb-6.jpg",
    sources: [{ src: "/videos/campaign-6.mp4", type: "video/mp4" }],
    width: 1920,
    height: 1080,
    description: "Ethereal campaign film for Brand X's Autumn Collection."
  },
];

export default function CampaignsPage() {
  return (
    // <-- MODIFICADO: Envolvemos el contenido en un motion.div para animar la página entera
    <motion.div
      initial={{ opacity: 0, y: 15 }} // Empieza transparente y ligeramente abajo
      animate={{ opacity: 1, y: 0 }}   // Se anima a ser visible y en su posición final
      transition={{ duration: 0.7, ease: 'easeOut' }} // Define la velocidad y el efecto
    >
      <CampaignsSection items={myCampaignVideos} />
    </motion.div>
  );
}