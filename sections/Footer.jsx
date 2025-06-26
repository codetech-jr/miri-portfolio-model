// components/Footer.js

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaEnvelope, FaPhoneAlt, FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';

// --- IMPORTA TU LOGO AQUÍ ---
// Ajusta la ruta si tu logo está en otro lugar.
// Por ejemplo: import logoBlanco from '@/../public/img/logo.svg';
import logoBlanco from '@/public/logo.png';

// --- Datos del Footer (puedes moverlos a un archivo de contenido si prefieres) ---
const footerData = {
  quickLinks: {
    title: "Quick Links",
    links: [
      { text: "Portfolio", href: "/portfolio" },
      { text: "Runway", href: "/runway" },
      { text: "Campaigns", href: "/campaigns" },
      { text: "Contact", href: "/#contact" },
    ],
  },
  contactInfo: {
    title: "Contact",
    email: "contact@mirih.com",
    phone: "+1 (212) 555-1234",
  },
  follow: {
    title: "Follow",
    socials: [
      { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/mirih" },
      { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com/mirih" },
      { name: "Twitter", icon: FaTwitter, url: "https://twitter.com/mirih" },
      { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com/in/mirih" },
    ],
  },
  copyrightText: `© ${new Date().getFullYear()} Miri Hernández. All rights reserved.`,
  legalLinks: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Service", href: "/terms-of-service" },
  ],
};

export default function Footer() {
  // --- Estilos y Colores ---
  const footerBgColor = "bg-[#111111]";
  const titleColor = "text-white";
  const linkColor = "text-[#A9A9A9]";
  const linkHoverColor = "hover:text-white";
  const iconColor = "text-[#BDBDBD]";
  const socialIconHoverColor = "hover:text-[#D4AFB9]";
  const dividerColor = "border-[#2C2C2C]";

  // --- Variantes de Animación ---
  const footerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // --- JSX del Componente ---
  return (
    <motion.footer
      className={`${footerBgColor} ${linkColor} text-sm`}
      variants={footerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8 md:py-16">
        <motion.div
          className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-2 lg:grid-cols-4 md:gap-12"
          variants={gridContainerVariants}
        >
          {/* Columna 1: Logo */}
          <motion.div className="md:col-span-2 lg:col-span-1" variants={itemVariants}>
            <Link href="/" className="inline-block mb-4">
              <Image
                src={logoBlanco}
                alt="Logo de Miri Hernández"
                width={150} // Ajusta el ancho como necesites
                height={40}  // Ajusta el alto para mantener la proporción
                className="h-auto" // Importante para la responsividad
              />
            </Link>
            <p className={linkColor}>Professional Model | Venezuela</p>
          </motion.div>

          {/* Columna 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h5 className={`text-base font-semibold ${titleColor} mb-4 uppercase tracking-wider`}>{footerData.quickLinks.title}</h5>
            <ul className="space-y-3">
              {footerData.quickLinks.links.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className={`${linkColor} ${linkHoverColor} transition-colors`}>
                      {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 3: Contacto */}
          <motion.div variants={itemVariants}>
            <h5 className={`text-base font-semibold ${titleColor} mb-4 uppercase tracking-wider`}>{footerData.contactInfo.title}</h5>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${footerData.contactInfo.email}`} className={`flex items-center ${linkColor} ${linkHoverColor} transition-colors`}>
                  <FaEnvelope className={`mr-2.5 ${iconColor}`} />
                  {footerData.contactInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${footerData.contactInfo.phone.replace(/\s+/g, '')}`} className={`flex items-center ${linkColor} ${linkHoverColor} transition-colors`}>
                  <FaPhoneAlt className={`mr-2.5 ${iconColor}`} />
                  {footerData.contactInfo.phone}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Columna 4: Redes Sociales */}
          <motion.div variants={itemVariants}>
            <h5 className={`text-base font-semibold ${titleColor} mb-4 uppercase tracking-wider`}>{footerData.follow.title}</h5>
            <div className="flex space-x-5">
              {footerData.follow.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`${iconColor} ${socialIconHoverColor} transition-colors`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Barra de Copyright */}
        <motion.div
          className={`border-t ${dividerColor} pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center`}
          variants={itemVariants}
        >
          <p className={`${linkColor} text-xs`}>
            {footerData.copyrightText}
          </p>
          <div className="flex mt-4 space-x-4 sm:mt-0">
            {footerData.legalLinks.map((link) => (
              <Link key={link.text} href={link.href} className={`${linkColor} text-xs ${linkHoverColor} transition-colors`}>
                  {link.text}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}