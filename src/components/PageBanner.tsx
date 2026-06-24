import React from 'react';
import { motion } from 'motion/react';

interface PageBannerProps {
  title: string;
  subtitle: string;
}

export default function PageBanner({ title, subtitle }: PageBannerProps) {
  return (
    <div className="relative h-64 sm:h-72 md:h-80 w-full bg-gray-950 overflow-hidden flex items-end pb-8 sm:pb-12">

      {/* Background Image with slow zoom */}
      <motion.img
        src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80"
        alt="Salman Restaurant kitchen banner"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent opacity-10 pointer-events-none" />

      {/* Decorative spinning accent ring */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-40 h-40 border border-brand-yellow/15 rounded-full animate-spin-slow pointer-events-none hidden md:block" />
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-24 h-24 border border-brand-yellow/10 rounded-full animate-spin-slow-reverse pointer-events-none hidden md:block" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent" />

      {/* Text Content */}
      <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 text-left pt-24 sm:pt-28 md:pt-32">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 mb-3"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ originX: 0 }}
            className="w-8 h-[2px] bg-brand-yellow inline-block"
          />
          <span className="text-2xs font-sans font-bold tracking-[0.25em] text-brand-yellow uppercase">
            {title}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, type: 'spring', stiffness: 90 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {subtitle}
        </motion.h1>
      </div>
    </div>
  );
}
