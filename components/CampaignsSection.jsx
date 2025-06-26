// components/CampaignsSection.js
"use client";
import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { FaPlay } from 'react-icons/fa';
// <-- NUEVO: Importamos motion para las animaciones
import { motion } from 'framer-motion';

const defaultCampaignItems = [
  { id: "campaign_video_1", brand: "Global Fashion Brand", title: "Spring/Summer '24", thumbnailSrc: "/assets/campaign1.jpg", sources: [{ src: "/assets/miri-pasarela.mp4", type: "video/mp4" }], width: 1920, height: 1080, description: "Lead role in the S/S '24 campaign film." },
  { id: "campaign_video_2", brand: "Tech Innovators Inc.", title: "The Future is Now", thumbnailSrc: "/assets/campaign2.jpg", src: "https://www.youtube.com/watch?v=z3y1c9_xl_4", description: "Featured in the product launch video." },
  { id: "campaign_video_3", brand: "Eco Lifestyle Goods", title: "Sustainable Living", thumbnailSrc: "/assets/campaign3.jpg", sources: [{ src: "/assets/miri-pasarela.mp4", type: "video/mp4" }], width: 1280, height: 720, description: "Narrating the brand story video." },
];

export default function CampaignsSection({
  mainTitle = "Campaign Films",
  description = "Showcasing impactful brand narratives and advertising films.",
  items = defaultCampaignItems,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const sectionBgColor = "bg-[#111111]";
  const mainTitleColor = "text-white";
  const descriptionColor = "text-[#A9A9A9]";
  const thumbnailTextColor = "text-white";
  const playIconColor = "text-[#D4AFB9]";

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const slides = items.map(item => ({
    type: "video",
    sources: item.sources,
    src: item.src,
    width: item.width,
    height: item.height,
    title: `${item.brand} - ${item.title}`,
    description: item.description,
  }));

  // <-- NUEVO: Variantes para la animación de entrada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <>
      {/* <-- MODIFICADO: La sección es el orquestador principal de la animación */}
      <motion.section
        id="campaigns"
        className={`${sectionBgColor} py-16 md:py-24`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold ${mainTitleColor} uppercase tracking-wider`}
            variants={itemVariants}
          >
            {mainTitle}
          </motion.h2>
          <motion.p
            className={`text-lg ${descriptionColor} max-w-2xl mx-auto mt-3 mb-12 md:mb-16 font-light`}
            variants={itemVariants}
          >
            {description}
          </motion.p>

          {/* <-- MODIFICADO: El grid es un sub-orquestador para las tarjetas */}
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
            variants={containerVariants} // Reutilizamos la variante para animar las tarjetas en cascada
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative overflow-hidden bg-gray-900 rounded-lg shadow-xl cursor-pointer group aspect-video"
                onClick={() => openLightbox(index)}
                variants={itemVariants} // Cada tarjeta se anima como un ítem
              >
                <Image
                  src={item.thumbnailSrc}
                  alt={`${item.brand} - ${item.title}`}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-colors duration-300 bg-black/50 group-hover:bg-black/30">
                  <div className="absolute">
                    <FaPlay className={`text-4xl md:text-5xl ${playIconColor} drop-shadow-lg transform transition-transform group-hover:scale-110`} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-100">
                    <h3 className={`text-base font-semibold ${thumbnailTextColor}`}>{item.brand}</h3>
                    <p className={`text-sm ${thumbnailTextColor} opacity-80`}>{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Video, Captions]}
        styles={{
            container: { backgroundColor: "rgba(0, 0, 0, .9)" },
            captionsTitle: { color: "#FFF", fontSize: "1.2rem", fontWeight: "600" },
            captionsDescription: { color: "#A9A9A9", fontSize: "1rem" },
        }}
        captions={{ showToggle: true, descriptionTextAlign: "center" }}
      />
    </>
  );
}