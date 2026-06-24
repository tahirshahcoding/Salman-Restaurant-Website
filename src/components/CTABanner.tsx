import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';

interface CTABannerProps {
  onNavigate: (section: string) => void;
}

export default function CTABanner({ onNavigate }: CTABannerProps) {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-gray-950">

      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1600&q=80"
          alt="BBQ background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/70 to-gray-950/40" />
      </div>

      {/* Decorative */}
      <div className="absolute top-8 left-8 w-32 h-32 border border-white/10 rounded-full" />
      <div className="absolute bottom-8 right-8 w-48 h-48 border border-brand-yellow/10 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-left max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-brand-yellow" />
            <span className="text-xs font-sans font-bold tracking-[0.2em] text-brand-yellow/80 uppercase">Reserve Your Seat</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
            Ready for an<br />
            <span className="text-brand-yellow font-script text-6xl md:text-7xl lg:text-8xl font-normal">Unforgettable</span><br />
            <span className="text-white">Dining Experience?</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
            From sizzling BBQ platters to Shinwari Karahi — book your table and experience Salman Restaurant's legendary hospitality in Chota Kalam.
          </p>
        </motion.div>

        {/* Right Actions */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto lg:w-auto shrink-0"
        >
          <button
            onClick={() => onNavigate('reservation')}
            className="bg-brand-yellow hover:bg-brand-darkYellow text-white font-sans font-bold tracking-widest text-sm px-10 py-5 rounded-2xl transition-all flex items-center gap-3 shadow-2xl shadow-yellow-500/20 cursor-pointer group"
          >
            <UtensilsCrossed className="w-5 h-5" />
            BOOK A TABLE
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-auto" />
          </button>
          <button
            onClick={() => onNavigate('menu')}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans font-bold tracking-widest text-sm px-10 py-5 rounded-2xl transition-all flex items-center gap-3 cursor-pointer group backdrop-blur-sm"
          >
            EXPLORE MENU
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-auto" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
