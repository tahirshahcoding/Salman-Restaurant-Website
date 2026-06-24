import React from 'react';
import { motion } from 'motion/react';

const GALLERY = [
  {
    src: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    label: 'BBQ Platter',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    label: 'Karahi Special',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    label: 'Shinwari Karahi',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    label: 'Kabuli Pulao',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
    label: 'Seekh Kabab',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80',
    label: 'Fresh Naan',
    span: 'md:col-span-2',
  },
];

export default function GalleryStrip() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-12 h-[2px] bg-brand-red" />
            <span className="text-xs font-sans font-bold tracking-[0.25em] text-gray-400 uppercase">Gallery</span>
            <span className="w-12 h-[2px] bg-brand-red" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
            From Our <span className="text-brand-red font-script text-5xl md:text-6xl lg:text-7xl font-normal">Kitchen</span>
          </h2>
          <p className="text-gray-500 text-base mt-4 max-w-md mx-auto">
            A glimpse into the sizzling flavours, golden naans, and rich karahi woks that define Salman Restaurant.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          {GALLERY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white font-sans font-bold text-sm tracking-wide">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
