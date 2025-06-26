// src/app/portfolio/page.js

"use client"; // <-- ¡MUY IMPORTANTE! para usar animaciones de cliente
// <-- NUEVO: Importamos motion para la animación de página
import { motion } from 'framer-motion';
import HeroPortfolio from '@/components/HeroPortfolio';
import AdvancedGallery from '@/components/AdvancedGallery';
import ModelStatsSection from "@/sections/ModelStatsSection";

export default function PortfolioPage() {
  return (
    // <-- MODIFICADO: Envolvemos el contenido en un <motion.main> para animar toda la página
    <motion.main
      className="bg-white dark:bg-black"
      initial={{ opacity: 0, y: 15 }} // Empieza transparente y ligeramente abajo
      animate={{ opacity: 1, y: 0 }}   // Se anima a ser visible y en su posición final
      transition={{ duration: 0.7, ease: 'easeOut' }} // Define la velocidad y el efecto
    >

      {/* --- SECCIÓN 1: HERO --- */}
      <HeroPortfolio
        imageUrl="/assets/miri-bg.jpg"
        title="Portfolio"
        subtitle="Discover a selection of my work on runway, editorial and commercial projects."
      />
      
      <ModelStatsSection/>
      
      {/* --- SECCIÓN 2: GALERÍA --- */}
      <section id="gallery" className="py-16 lg:py-24">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-800 md:text-5xl dark:text-gray-100">
              WORK GALLERY
            </h2>
          </div>
          <AdvancedGallery />
        </div>
      </section>
      
    </motion.main>
  );
}