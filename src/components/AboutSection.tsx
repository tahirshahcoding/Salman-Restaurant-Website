import React from 'react';
import { Sparkles, BadgeCheck, BookOpen, Phone, MapPin, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import salmanImg from '@/assets/images/salman.png';

export default function AboutSection() {
  return (
    <section id="about" className="bg-white border-b border-gray-100">

      {/* ── Part 1: Story + Values ───────────────────────────────────────── */}
      <div className="py-24 md:py-32">
        <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

          {/* Section Label */}
          <div className="flex flex-col items-center mb-16 text-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-[2px] bg-brand-red" />
              <span className="text-xs font-sans font-bold tracking-[0.25em] text-gray-400 uppercase">Our Story</span>
              <span className="w-12 h-[2px] bg-brand-red" />
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 leading-tight mb-4">
              Welcome to<br />
              <span className="text-brand-red">Salman Restaurant</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
              A culinary sanctuary nestled in the heart of Chota Kalam, Swat — where tradition meets taste.
            </p>
          </div>

          {/* Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-24">

            {/* Left Column: Large Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full h-[500px] md:h-[640px] lg:h-[720px] rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  alt="Salman Restaurant kitchen"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent pointer-events-none" />

                {/* Bottom overlay text on image */}
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-script text-4xl text-white drop-shadow-lg" style={{ fontFamily: '"Great Vibes", cursive' }}>
                    Cooked with Love
                  </p>
                  <p className="text-white/80 text-xs font-sans tracking-widest uppercase mt-1">Chota Kalam, Swat</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Narrative & Values */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-left"
            >
              <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed font-sans">
                At Salman Restaurant, we believe that great food brings people together. Our passion for authentic Mughlai and Lahori flavors, superior quality farm ingredients, and exemplary warm hospitality creates an unforgettable culinary escape. Whether it is a family dinner, a milestone celebration, or a casual outing, we treat every table with meticulous craftsmanship.
              </p>

              {/* Features Vertical List */}
              <ul className="space-y-8 mb-10">
                <li className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-brand-yellow shrink-0 shadow-sm">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-sans font-bold text-gray-900 text-base tracking-wide mb-1">Fresh Ingredients</h4>
                    <p className="text-gray-500 text-sm font-sans leading-relaxed">
                      Organic farm-to-table vegetables and hand-ground daily spices sourced from local farms in the Swat valley.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-brand-red shrink-0 shadow-sm">
                    <BadgeCheck className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-sans font-bold text-gray-900 text-base tracking-wide mb-1">Hygienic &amp; Safe</h4>
                    <p className="text-gray-500 text-sm font-sans leading-relaxed">
                      Sourced from certified Halal partners under extreme kitchen sanitization checks with no artificial additives.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center text-brand-darkYellow shrink-0 shadow-sm">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-sans font-bold text-gray-900 text-base tracking-wide mb-1">Authentic Recipes</h4>
                    <p className="text-gray-500 text-sm font-sans leading-relaxed">
                      Centuries-old slow culinary styles — Shinwari Karahi, Dum Kabuli Pulao, Tandoori BBQ — preserved and crafted with absolute integrity.
                    </p>
                  </div>
                </li>
              </ul>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-2 text-sm font-sans text-gray-600">
                  <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                  Chota Kalam, Ningolai, Swat
                </div>
                <div className="flex items-center gap-2 text-sm font-sans text-gray-600">
                  <Phone className="w-4 h-4 text-brand-red shrink-0" />
                  Open Daily · 12pm – 12am
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Full-Width Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                emoji: '🔥',
                title: 'Clay Tandoor',
                desc: 'Burning at 450°C for the perfect naan and tikka crust — the traditional way since day one.'
              },
              {
                emoji: '🫕',
                title: 'Shinwari Karahi',
                desc: 'Our signature wok-fire Shinwari mutton — no heavy spices, just pure slow-cooked flavor.'
              },
              {
                emoji: '🌿',
                title: 'Valley Fresh',
                desc: 'Every ingredient is sourced fresh from the Swat valley. No preservatives. Ever.'
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-4xl mb-4 block">{card.emoji}</span>
                <h4 className="font-serif font-bold text-gray-900 text-xl mb-2">{card.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Part 2: CEO Message ───────────────────────────────────────────── */}
      <div className="bg-gray-950 py-24 md:py-32">
        <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Left: CEO Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glowing circle background behind photo */}
                <div className="absolute inset-0 bg-brand-yellow/10 rounded-full blur-3xl scale-110 pointer-events-none" />

                <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border-4 border-brand-yellow/30 shadow-2xl">
                  <img
                    src={salmanImg}
                    alt="Salman — CEO & Founder"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* CEO badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-brand-yellow text-white px-6 py-2.5 rounded-full shadow-xl font-sans font-black text-sm tracking-widest uppercase whitespace-nowrap border-2 border-white/20">
                  CEO &amp; Founder
                </div>
              </div>
            </motion.div>

            {/* Right: Message */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-left"
            >
              {/* Label */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-8 h-[2px] bg-brand-yellow" />
                <span className="text-xs font-sans font-bold tracking-[0.25em] text-brand-yellow/80 uppercase">A Message from Our CEO</span>
              </div>

              {/* Big Quote mark */}
              <div className="text-brand-yellow/20 mb-2">
                <Quote className="w-16 h-16" />
              </div>

              <blockquote className="text-white text-lg md:text-xl lg:text-2xl font-serif italic leading-relaxed mb-8">
                "When I started Salman Restaurant, I had one simple goal: to serve the kind of food that makes people feel at home. Real flavours, real ingredients, and real warmth. That vision hasn't changed — it's only gotten stronger. Every plate we serve is a promise: we will never compromise on quality, and we will always welcome you like family."
              </blockquote>

              {/* Signature */}
              <div className="flex items-center gap-5 pt-6 border-t border-white/10">
                <div>
                  <span
                    className="font-script text-5xl text-white select-none block leading-none"
                    style={{ fontFamily: '"Great Vibes", cursive' }}
                  >
                    Salman
                  </span>
                  <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400 mt-1 block">
                    CEO &amp; Founder — Salman Restaurant
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}
