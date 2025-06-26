// components/ContactSection.jsx
"use client";
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
// <-- NUEVO: Importamos motion para las animaciones
import { motion } from 'framer-motion';

export default function ContactSection({
  compCardUrl = "/path/to/your/comp-card.pdf",
  whatsappNumber = "15551234567",
}) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry!");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Miri, I'm interested in discussing a potential project.")}`;

  // <-- NUEVO: Variantes para la animación
  // Variante para contenedores que animan a sus hijos en cascada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Variante para los elementos individuales que se desvanecen hacia arriba
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.section
      className="bg-[#F8F8F8] py-16 md:py-24"
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container max-w-3xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#2D2D2D] uppercase tracking-wider"
          variants={itemVariants}
        >
          Contact
        </motion.h2>
        <motion.p className="text-lg text-[#333333] mt-2 mb-10" variants={itemVariants}>
          Get in touch for bookings and collaborations.
        </motion.p>

        {/* <-- MODIFICADO: El formulario es ahora un sub-contenedor de animación */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 text-left"
          variants={containerVariants} // Anima sus propios hijos en cascada
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-[#666666] mb-1">Name</label>
              <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange}
                     className="w-full px-4 py-2 bg-white border border-[#DDDDDD] rounded-md placeholder:text-[#A9A9A9] focus:ring-1 focus:ring-[#D4AFB9] focus:border-[#D4AFB9] transition"
                     placeholder="Your Name" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-[#666666] mb-1">Email</label>
              <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange}
                     className="w-full px-4 py-2 bg-white border border-[#DDDDDD] rounded-md placeholder:text-[#A9A9A9] focus:ring-1 focus:ring-[#D4AFB9] focus:border-[#D4AFB9] transition"
                     placeholder="your.email@example.com" />
            </motion.div>
          </div>
          <motion.div variants={itemVariants}>
            <label htmlFor="subject" className="block text-sm font-medium text-[#666666] mb-1">Subject</label>
            <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleInputChange}
                   className="w-full px-4 py-2 bg-white border border-[#DDDDDD] rounded-md placeholder:text-[#A9A9A9] focus:ring-1 focus:ring-[#D4AFB9] focus:border-[#D4AFB9] transition"
                   placeholder="Booking Inquiry" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block text-sm font-medium text-[#666666] mb-1">Message</label>
            <textarea name="message" id="message" rows="5" required value={formData.message} onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white border border-[#DDDDDD] rounded-md placeholder:text-[#A9A9A9] focus:ring-1 focus:ring-[#D4AFB9] focus:border-[#D4AFB9] transition"
                      placeholder="Tell me about your project..."></textarea>
          </motion.div>
          
          <motion.div className="text-center" variants={itemVariants}>
            <button type="submit"
              className="px-10 py-3 rounded-md text-sm font-semibold uppercase tracking-wider bg-[#D4AFB9] text-black hover:bg-[#C8A2AD] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AFB9] focus:ring-offset-[#F8F8F8]">
              Submit Inquiry
            </button>
          </motion.div>
        </motion.form>

        <motion.div className="flex items-center justify-center my-12" variants={itemVariants}>
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </motion.div>

        {/* <-- MODIFICADO: El contenedor de botones es otro sub-contenedor de animación */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={containerVariants} // Anima sus propios hijos en cascada
        >
          <motion.a href={whatsappLink} target="_blank" rel="noopener noreferrer" variants={itemVariants}
             className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-md font-semibold bg-[#25D366] text-white hover:bg-[#1DAF53] transition-colors duration-300">
            <FaWhatsapp className="mr-2" />
            Chat on WhatsApp
          </motion.a>

          <motion.a href={compCardUrl} download variants={itemVariants}
             className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-md font-semibold bg-transparent border border-[#D4AFB9] text-[#D4AFB9] hover:bg-[#D4AFB9] hover:text-black transition-all duration-300">
            <HiDownload className="mr-2" />
            Download Comp Card
          </motion.a>
        </motion.div>
        
      </div>
    </motion.section>
  );
}