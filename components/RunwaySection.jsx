// components/RunwaySection.js
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

const defaultRunwayItems = [
  { id: "runway1", type: "video", title: "NY Fashion Week S/S '24", thumbnailSrc: "/assets/runway1.jpg", sources: [{ src: "/assets/miri-pasarela.mp4", type: "video/mp4" }], width: 1920, height: 1080, description: "Opening for Designer X at New York Fashion Week." },
  { id: "runway2", type: "image", title: "Paris Haute Couture '23", thumbnailSrc: "/assets/runway2.jpg", src: "/assets/runway2-full.jpg", description: "Look from Designer Y's collection." },
  { id: "runway3", type: "video", title: "Milan Fashion Week F/W '23", thumbnailSrc: "/assets/runway3.jpg", src: "https://www.youtube.com/watch?v=z3y1c9_xl_4", description: "Walking for Designer Z at MFW." },
];

export default function RunwaySection({
  title = "Runway Highlights",
  description = "A glimpse into pivotal moments on the catwalk, showcasing versatility and presence in diverse fashion events.",
  items = defaultRunwayItems,
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
    type: item.type,
    sources: item.type === 'video' ? item.sources : undefined,
    src: item.src,
    width: item.width,
    height: item.height,
    title: item.title,
    description: item.description,
  }));

  // <-- NUEVO: Variantes para la animación
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
      {/* <-- MODIFICADO: La sección dispara y orquesta la animación */}
      <motion.section
        id="runway"
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
            {title}
          </motion.h2>
          <motion.p
            className={`text-lg ${descriptionColor} max-w-2xl mx-auto mt-3 mb-12 md:mb-16 font-light`}
            variants={itemVariants}
          >
            {description}
          </motion.p>

          {/* <-- MODIFICADO: El grid actúa como un sub-orquestador para las tarjetas */}
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
            variants={containerVariants} // Reutilizamos para animar las tarjetas en cascada
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative overflow-hidden bg-gray-900 rounded-lg shadow-xl cursor-pointer group aspect-video"
                onClick={() => openLightbox(index)}
                variants={itemVariants} // Cada tarjeta se anima individualmente
              >
                <Image
                  src={item.thumbnailSrc}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-colors duration-300 bg-black/50 group-hover:bg-black/30">
                  {item.type === 'video' && (
                    <div className="absolute">
                      <FaPlay className={`text-4xl md:text-5xl ${playIconColor} drop-shadow-lg transform transition-transform group-hover:scale-110`} />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-100">
                     <h3 className={`text-base font-semibold ${thumbnailTextColor} text-left`}>
                      {item.title}
                    </h3>
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