import React from 'react';
import { motion } from 'motion/react';

const MILESTONES = [
  {
    phase: 'Phase 1',
    title: 'The Beginning',
    desc: 'Salman opened a small roadside eatery in Chota Kalam, Swat, serving Shinwari Karahi and Kabuli Pulao to travellers. Word spread fast.',
    emoji: '🏕️',
  },
  {
    phase: 'Phase 2',
    title: 'The Clay Tandoor Era',
    desc: 'Installed a traditional red-clay tandoor burning at 450°C. Authentic BBQ — Chicken Boti, Seekh Kababs, and Naans — became the restaurant\'s signature.',
    emoji: '🔥',
  },
  {
    phase: 'Phase 3',
    title: 'Afghani Corner Added',
    desc: 'Inspired by cross-border culinary traditions, a dedicated Afghani Corner was launched: Kabuli Pulao, Kanda, Afghani Shola, and Do Piaza.',
    emoji: '🇦🇫',
  },
  {
    phase: 'Phase 4',
    title: '10,000 Happy Customers',
    desc: 'A milestone celebration. Over 10,000 satisfied patrons — local families, tourists, and returning regulars from across Pakistan.',
    emoji: '🎉',
  },
  {
    phase: 'Phase 5',
    title: 'Expanded to Full Menu',
    desc: 'Launched the complete menu with 8 categories, over 55 dishes spanning BBQ, Pakistani, Shinwari, Afghani, and more — all under one roof.',
    emoji: '🍽️',
  },
  {
    phase: 'Today',
    title: 'Still Going Strong',
    desc: 'Salman Restaurant continues to serve authentic flavors with zero compromise — passion, patience, and perfect food, every single day.',
    emoji: '⭐',
  },
];

export default function MilestonesSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-950 overflow-hidden relative">

      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%221%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      <div className="relative z-10 w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-12 h-[2px] bg-brand-yellow" />
            <span className="text-xs font-sans font-bold tracking-[0.25em] text-brand-yellow/80 uppercase">Our Journey</span>
            <span className="w-12 h-[2px] bg-brand-yellow" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            A Journey of <span className="text-brand-yellow font-script text-5xl md:text-6xl lg:text-7xl font-normal">Flavour</span>
          </h2>
          <p className="text-gray-400 text-base mt-4 max-w-lg mx-auto leading-relaxed">
            From a small roadside kitchen to Swat's most beloved restaurant — our story is one of passion, perseverance, and perfect food.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-brand-yellow/30 transition-all duration-300 group"
            >
              {/* Phase badge */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{m.emoji}</span>
                <span className="bg-brand-yellow/20 text-brand-yellow text-xs font-sans font-black tracking-widest px-3 py-1 rounded-full">
                  {m.phase}
                </span>
              </div>
              <h3 className="text-white font-serif font-bold text-xl mb-3 group-hover:text-brand-yellow transition-colors">
                {m.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {m.desc}
              </p>

              {/* Connector line (visual only) */}
              <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-brand-yellow/40 group-hover:bg-brand-yellow transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
