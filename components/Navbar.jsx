// components/Navbar.js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <-- NUEVO: Importamos el componente Image
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const defaultNavLinks = [
  { text: "Inicio", href: "/" },
  { text: "Portfolio", href: "/portfolio" },
  { text: "Runway", href: "/runway" },
  { text: "Campaigns", href: "/campaigns" },
  { text: "Contact", href: "/#contact" },
];

export default function Navbar({
  // <-- MODIFICADO: Añadimos props para el logo y eliminamos siteName
  logoSrc = "/logo.png", // <-- CAMBIA ESTO por la ruta de tu logo en la carpeta /public
  logoAlt = "Logo de Miri",
  logoWidth = 100, // <-- CAMBIA ESTO por el ancho de tu logo
  logoHeight = 20, // <-- CAMBIA ESTO por el alto de tu logo
  navLinks = defaultNavLinks,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const textColor = "text-white";
  const hoverTextColor = "hover:text-gray-300";
  const activeLinkBorderColor = "bg-[#D4AFB9]";

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuVariants = {
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 400, damping: 40, when: "afterChildren" } },
    open: { x: '0%', transition: { type: 'spring', stiffness: 200, damping: 30, staggerChildren: 0.07 } },
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 },
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 w-full shadow-lg bg-black/80 backdrop-blur-sm"
      >
        <nav className="container px-4 py-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* <-- INICIO DEL CAMBIO: Reemplazamos el texto por el componente Image --> */}
            <Link href="/" aria-label={logoAlt} className="flex-shrink-0">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={logoWidth}
                height={logoHeight}
                priority // Carga el logo más rápido, bueno para LCP
              />
            </Link>
            {/* <-- FIN DEL CAMBIO --> */}

            {/* Menú Desktop */}
            <ul className={`hidden md:flex space-x-6 lg:space-x-8 items-center`}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <li key={link.text} className="relative">
                    <Link
                      href={link.href}
                      className={`text-sm lg:text-base font-medium ${textColor} ${hoverTextColor} transition-colors pb-1`}
                    >
                      {link.text}
                    </Link>
                    {isActive && (
                      <motion.div
                        className={`absolute left-0 -bottom-1 h-[2px] w-full ${activeLinkBorderColor}`}
                        layoutId="underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Botón Hamburguesa */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                className={`${textColor} focus:outline-none focus:ring-2 focus:ring-white rounded z-[70] relative`}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 180, opacity: 0 }}>
                      <HiX size={28} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -180, opacity: 0 }}>
                      <HiMenu size={28} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Menú Desplegable para Móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm pt-20 md:hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`absolute top-6 right-6 ${textColor} focus:outline-none focus:ring-2 focus:ring-white rounded`}
                aria-label="Close menu"
            >
                <HiX size={30} />
            </button>

            <ul className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map((link) => (
                <motion.li key={link.text} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      text-2xl font-medium ${textColor} ${hoverTextColor} transition-colors
                      ${pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                        ? 'font-bold opacity-100'
                        : 'opacity-80'
                      }
                    `}
                  >
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}