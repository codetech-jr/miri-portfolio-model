// src/components/AdvancedGallery.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { images } from '@/lib/gallery-data';
// <-- NUEVO: Importamos motion y AnimatePresence de Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Todos', ...new Set(images.map((image) => image.category))];

export default function AdvancedGallery() {
  const [index, setIndex] = useState(-1);
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredImages =
    activeFilter === 'Todos'
      ? images
      : images.filter((image) => image.category === activeFilter);

  const slides = filteredImages.map(({ src, alt, width = 1920, height = 1080 }) => ({
    src,
    alt,
    width,
    height,
  }));

  // <-- NUEVO: Variantes para la animación de los botones de filtro
  const filterContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const filterItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full">
      {/* --- BARRA DE FILTROS ANIMADA --- */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 mb-12"
        variants={filterContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300
              ${
                activeFilter === category
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-gray-700'
              }`}
            variants={filterItemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* --- GRID DE LA GALERÍA ANIMADO --- */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* <-- MODIFICADO: Envolvemos el mapeo de imágenes con AnimatePresence */}
        <AnimatePresence>
          {filteredImages.map((image, idx) => (
            <motion.div
              key={image.id} // La key es crucial para que AnimatePresence funcione
              layout // Esta propiedad anima los cambios de posición de los elementos
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative cursor-pointer overflow-hidden rounded-lg aspect-[9/16] group"
              onClick={() => setIndex(idx)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Lightbox
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </div>
  );
}