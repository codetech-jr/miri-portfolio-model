"use client";

import { useState, useRef, useEffect } from 'react';
// <-- NUEVO: Importamos motion y AnimatePresence de Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

const PlayIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
  </svg>
);

export default function VideoReelSection({
  videoSrc = "/assets/miri-pasarela.mp4",
  thumbnailSrc = "/assets/miri-thubnail.jpg",
  title = "Video Reel",
  description = "A glimpse into my work on the runway, capturing movement and style.",
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => setIsPlaying(true);
  const handleVideoEnd = () => setIsPlaying(false);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error attempting to play video:", error);
      });
    }
  }, [isPlaying]);

  // <-- NUEVO: Variantes para la animación de entrada de la sección
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.section
      className="bg-[#111111] py-16 md:py-20 lg:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
        <motion.h2
          className="mb-3 text-3xl font-bold tracking-wider text-white uppercase sm:text-4xl"
          variants={itemVariants}
        >
          {title}
        </motion.h2>

        {description && (
          <motion.p
            className="text-lg text-[#A9A9A9] max-w-2xl mx-auto mb-10 font-light"
            variants={itemVariants}
          >
            {description}
          </motion.p>
        )}

        <motion.div
          className="relative w-full max-w-4xl mx-auto overflow-hidden bg-gray-900 rounded-lg shadow-2xl aspect-video"
          variants={itemVariants}
        >
          {/* <-- NUEVO: AnimatePresence para la transición entre thumbnail y video */}
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              <motion.div
                key="thumbnail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnailSrc}
                  alt="Video reel thumbnail"
                  className="absolute inset-0 object-cover w-full h-full cursor-pointer"
                  onClick={handlePlay}
                />
                <div className="absolute inset-0 bg-black/20" />

                <motion.button
                  onClick={handlePlay}
                  aria-label="Play video reel"
                  className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-20 h-20 sm:w-24 sm:h-24
                    rounded-full border-2 border-[#D4AFB9]
                    flex items-center justify-center
                    transition-all duration-300 ease-in-out 
                    hover:bg-[#D4AFB9] group
                    focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-[#111111] focus:ring-[#D4AFB9]
                  `}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
                >
                  <PlayIcon className="w-9 h-9 sm:w-10 sm:h-10 text-[#D4AFB9] group-hover:text-black transition-colors" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="video"
                className='w-full h-full'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <video
                  ref={videoRef}
                  src={videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full"
                  onEnded={handleVideoEnd}
                >
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}