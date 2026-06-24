import React, { useState } from 'react';
import { Sparkles, Play, X, Clock, Award, Star, ArrowRight, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Image imports using the @/ alias
import salmanImg from '@/assets/images/salman.png';
import brushImg from '@/assets/images/brush.png';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenBooking: () => void;
}

export default function Hero({ onExploreMenu, onOpenBooking }: HeroProps) {
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [activeStoryTab, setActiveStoryTab] = useState<'story' | 'menu' | 'values'>('story');

  const storySlides = {
    story: {
      title: 'Who We Are',
      description: 'Salman Restaurant is located in Chota Kalam, Ningolai, Swat — specialising in Karahi, Fish & Rosh. CEO Salman built this restaurant on one promise: serve real food, with real ingredients, and treat every guest like family. No shortcuts. No artificial flavours. Just honest, authentic taste.',
      bulletTitle: 'What We Are Known For',
      bullets: [
        'Shinwari & Namkeen Karahi — our signature',
        'Sizzling BBQ platters from clay tandoor',
        'Fresh Grilled & Angara Fish',
        'Over 10,000 happy customers served',
      ]
    },
    menu: {
      title: 'Our Menu',
      description: 'We offer over 55 dishes across 8 categories — all prepared fresh daily. From sizzling BBQ and rich Karahis to Afghani Kabuli Pulao and grilled fish from the mountain streams of Swat.',
      bulletTitle: 'Menu Categories',
      bullets: [
        '🍢 BBQ — Boti, Seekh Kabab, Tikka, Platters',
        '🍛 Pakistani — Karahi, Handi, Makhan Handi',
        '🥩 Shinwari & Mutton — Dumba, Namkeen, Rosh',
        '🐟 Fish — Grilled, Angara & more',
        '🍚 Afghani — Kabuli Pulao, Do Piaza, Shola',
        '🫓 Naan & Refreshments included',
      ]
    },
    values: {
      title: 'Our Promise to You',
      description: 'We believe in "Mehman-Nawazi" — the tradition of treating every guest like royalty. At Salman Restaurant, you will always find a warm welcome, hygienic food, and zero compromise on quality.',
      bulletTitle: 'Our Standards',
      bullets: [
        '100% Halal — certified ingredients only',
        'No preservatives, no artificial colours or MSG',
        'Freshly ground spice blends prepared daily',
        'Family-friendly atmosphere in Chota Kalam',
      ]
    }
  };

  return (
    <>
      <section id="home" className="relative bg-white pt-28 pb-0 md:pt-36 overflow-hidden min-h-screen flex flex-col justify-center">

        {/* Decorative Grid and Sparkles */}
        <div className="absolute inset-0 bg-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none animate-slow-drift" />


        {/* Minimal Restaurant Background Doodles (9 Section-level + 3 Column-level = 12 total) */}
        {/* Doodle 1: Crossed Fork and Spoon */}
        <div className="absolute top-[18%] left-[6%] z-0 select-none pointer-events-none opacity-[0.25] transform -rotate-12 hidden md:block">
          <svg className="w-20 h-20 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M18 3s-1.5 2-1.5 5.5S18 14 18 14M18 14v7M16.5 8c0-3.5 1.5-5 1.5-5s1.5 1.5 1.5 5c0 3.5-1.5 6-1.5 6" />
            <path d="M6 3v5c0 2 1.5 3 3 3s3-1 3-3V3M7.5 3v5M10.5 3v5M9 11v10" />
          </svg>
        </div>

        {/* Doodle 2: Chef Hat */}
        <div className="absolute top-[12%] left-[42%] z-0 select-none pointer-events-none opacity-[0.16] transform rotate-[15deg] hidden lg:block">
          <svg className="w-18 h-18 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M6 16c-1.5 0-3-1.5-3-3s1.5-3 3-3c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6c1.5 0 3 1.5 3 3s-1.5 3-3 3H6z" />
            <path d="M5 16h14v3H5v-3z" />
          </svg>
        </div>

        {/* Doodle 3: Steaming Cooking Pot */}
        <div className="absolute bottom-[18%] left-[10%] z-0 select-none pointer-events-none opacity-[0.2] transform rotate-6 hidden lg:block">
          <svg className="w-24 h-24 text-brand-red" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M3 10h18v7a3 3 0 01-3 3H6a3 3 0 01-3-3v-7z" />
            <path d="M12 2v3M9 3v2M15 3v2M2 10h20" />
          </svg>
        </div>

        {/* Doodle 4: Salt & Pepper Shakers */}
        <div className="absolute top-[32%] left-[16%] z-0 select-none pointer-events-none opacity-[0.16] transform rotate-12 hidden md:block">
          <svg className="w-14 h-14 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M9 8h6v11a2 2 0 01-2 2h-2a2 2 0 01-2-2V8zM10 5h4v3h-4z" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="15" r="1" />
          </svg>
        </div>

        {/* Doodle 5: Steaming Tea/Coffee Cup */}
        <div className="absolute bottom-[28%] left-[4%] z-0 select-none pointer-events-none opacity-[0.2] transform -rotate-12 hidden md:block">
          <svg className="w-16 h-16 text-brand-red" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v8a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 3v2M10 3v2M14 3v2" />
          </svg>
        </div>

        {/* Doodle 6: Wheat / Grain Stalk */}
        <div className="absolute bottom-[10%] left-[32%] z-0 select-none pointer-events-none opacity-[0.18] transform rotate-[45deg] hidden lg:block">
          <svg className="w-16 h-16 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M12 2v20M12 4c1-1 3 0 3 1.5s-2 2.5-3 2.5M12 4c-1-1-3 0-3 1.5s2 2.5 3 2.5M12 9c1-1 3 0 3 1.5s-2 2.5-3 2.5M12 9c-1-1-3 0-3 1.5s2 2.5 3 2.5M12 14c1-1 3 0 3 1.5s-2 2.5-3 2.5M12 14c-1-1-3 0-3 1.5s2 2.5 3 2.5" />
          </svg>
        </div>

        {/* Doodle 7: Rolling Pin */}
        <div className="absolute top-[5%] left-[25%] z-0 select-none pointer-events-none opacity-[0.15] transform -rotate-[30deg] hidden lg:block">
          <svg className="w-20 h-20 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M2 12h2M20 12h2M4 9h16v6H4z" />
          </svg>
        </div>

        {/* Doodle 8: Sauce Pan / Wok */}
        <div className="absolute top-[42%] left-[45%] z-0 select-none pointer-events-none opacity-[0.15] transform rotate-[25deg] hidden lg:block">
          <svg className="w-18 h-18 text-brand-red" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M11 6a6 6 0 100 12h5a1 1 0 001-1V7a1 1 0 00-1-1h-5zM17 12h5" />
          </svg>
        </div>

        {/* Doodle 9: Serving Cloche */}
        <div className="absolute bottom-[35%] right-[2%] z-0 select-none pointer-events-none opacity-[0.18] transform -rotate-12 hidden lg:block">
          <svg className="w-20 h-20 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M3 17h18M5 17a7 7 0 0114 0M12 5V3M10 3h4" />
          </svg>
        </div>

        <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 grid grid-cols-12 gap-4 lg:gap-16 items-center relative z-10 flex-1">

          {/* ── Text Content Block ─────────────────────────────────── */}
          <motion.div
            className="hidden md:block md:col-span-7 lg:col-span-7 xl:col-span-7 max-w-2xl text-left py-12 lg:py-32 relative z-20"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } }
            }}
          >
            {/* Top Badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }}
              className="hidden md:flex items-center gap-2.5 mb-5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-yellow">
                <path d="M3 19h18" />
                <path d="M5 19a7 7 0 0 1 14 0" />
                <path d="M12 5V3" />
                <path d="M11 3h2" />
              </svg>
              <div className="h-[1.5px] w-8 bg-brand-yellow"></div>
              <span className="text-xs font-sans font-extrabold tracking-[0.2em] text-gray-500 uppercase leading-none">
                GOOD FOOD, GREAT MOOD
              </span>
            </motion.div>

            {/* Display Headings — two-beat stagger */}
            <div className="hidden md:block mb-4 sm:mb-6">
              <motion.div
                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
                className="text-3xl sm:text-6xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] font-medium text-gray-900 leading-[1.08] text-shadow-sm"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Good Food
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] } } }}
                className="text-brand-red font-normal block -mt-2 sm:-mt-3 lg:-mt-4 select-none leading-none whitespace-nowrap"
                style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(1.8rem, 7vw, 8.5rem)' }}
              >
                Great Moments
              </motion.div>
            </div>

            {/* Subtext description */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }}
              className="hidden md:block text-gray-600 text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl mb-4 sm:mb-6 lg:mb-10 leading-relaxed max-w-xl font-medium"
            >
              Delicious flavors, warm hospitality, and unforgettable moments — only at{' '}
              <span className="font-bold text-gray-800 border-b border-brand-yellow/50">Salman Restaurant.</span>
            </motion.p>

            {/* Location chip */}
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } } }}
              className="hidden md:inline-flex items-center gap-1 bg-gray-100 rounded-full px-2.5 py-1 mb-4 sm:mb-6 sm:px-4 sm:py-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
              <span className="text-[9px] sm:text-xs font-sans font-semibold text-gray-600 tracking-wide">
                📍 Chota Kalam, Ningolai, Swat
              </span>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreMenu}
                className="bg-brand-yellow hover:bg-brand-darkYellow text-white pl-2.5 pr-6 py-2 sm:pl-3 sm:pr-8 sm:py-3 rounded-full font-sans font-bold tracking-widest transition-all flex items-center gap-2 sm:gap-3 shadow-lg shadow-yellow-500/20 text-[10px] sm:text-xs md:text-sm cursor-pointer animate-glow-pulse w-fit"
              >
                <span className="bg-white/10 p-1.5 sm:p-2.5 rounded-full flex items-center justify-center border border-white/20">
                  <Utensils className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                </span>
                EXPLORE MENU
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={() => setShowStoryModal(true)}
                className="flex items-center gap-2 sm:gap-3 text-gray-800 font-sans font-bold text-[10px] sm:text-xs md:text-sm tracking-widest hover:text-brand-red transition-colors group cursor-pointer w-fit"
              >
                <span className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-brand-red flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all shadow-sm shrink-0">
                  <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 ml-0.5 fill-current" />
                </span>
                WATCH OUR STORY
              </motion.button>
            </motion.div>

          </motion.div>

          {/* ── Image Column ───────────────────────────────────────── */}
          <motion.div
            className="col-span-12 md:col-span-5 relative w-full h-[480px] sm:h-[580px] lg:h-[780px] xl:h-[880px] flex items-end justify-center z-10"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* Red Brush Stroke Background (Moved inside the column to sit under portrait on mobile) */}
            <img
              src={brushImg}
              alt="Brush Stroke Accent"
              className="absolute right-0 bottom-[-20px] lg:bottom-[-80px] w-[85%] md:w-[60%] lg:w-[120%] max-w-[1000px] h-auto object-contain z-0 select-none pointer-events-none transform translate-y-2 lg:translate-y-12"
            />

            {/* Wrapper for centering and positioning the image */}
            <div className="absolute inset-x-0 bottom-0 h-[115%] lg:h-[120%] flex items-end justify-center lg:justify-end">
              <img
                src={salmanImg}
                alt="Salman — CEO & Founder"
                className="h-full w-auto max-w-none object-contain z-10 select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] animate-float-bob"
                style={{ transformOrigin: 'bottom center' }}
              />
            </div>

            {/* Doodle: Bell Pepper */}
            <div className="absolute top-[35%] left-[5%] lg:-left-5 z-0 select-none pointer-events-none opacity-30 transform -rotate-12">
              <svg className="w-14 h-14 sm:w-28 sm:h-28 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path d="M12 6c-1.5-2.5-4-3-6-3s-4 1.5-4 4.5c0 4.5 3 9.5 6 11.5 3 2 9 2 12 0 3-2 6-7 6-11.5 0-3-2-4.5-4-4.5s-4.5.5-6 3z" />
                <path d="M12 6V3c0-1-1-2-2-2" />
                <path d="M8 8c.5-2 2-3 4-3" />
              </svg>
            </div>

            {/* Doodle: Leaves */}
            <div className="absolute bottom-[35%] left-[-10%] lg:-left-12 z-0 select-none pointer-events-none opacity-35 transform rotate-45">
              <svg className="w-10 h-10 sm:w-16 sm:h-16 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <path d="M2 22C10 22 22 10 22 2C14 2 2 14 2 22Z" />
                <path d="M2 22C8 16 16 8 22 2" />
                <path d="M12 12c-2-2-4-2-6-1M12 12c2 2 2 4 1 6" />
              </svg>
            </div>

            {/* Doodle: Made with Love Hand-drawn text and arrow */}
            <div className="absolute top-[20%] right-[2%] lg:right-[-5%] z-20 flex flex-col items-center select-none pointer-events-none rotate-6 scale-[0.65] sm:scale-100">
              <span className="font-script text-2xl lg:text-3xl text-brand-red leading-none drop-shadow-sm" style={{ fontFamily: '"Great Vibes", cursive' }}>
                Made
              </span>
              <span className="font-script text-xl lg:text-2xl text-brand-red leading-none mt-0.5 flex items-center gap-1" style={{ fontFamily: '"Great Vibes", cursive' }}>
                with <span className="text-brand-yellow text-base font-sans">♥</span> Love
              </span>
              <svg className="w-14 h-14 text-gray-400 mt-1 transform -scale-x-100 rotate-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M3 3c5 2 12 1 15 8m0 0l-4-1m4 1l-1 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Doodle: Sparkles */}
            <div className="absolute top-[15%] left-[25%] z-0 select-none pointer-events-none opacity-25">
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-brand-yellow animate-pulse" />
            </div>

            {/* Mobile Ribbon with Buttons */}
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-2xl py-3.5 px-4 flex justify-center items-center gap-5 md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreMenu}
                className="bg-brand-yellow hover:bg-brand-darkYellow text-white pl-2.5 pr-6 py-2 rounded-full font-sans font-bold tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/20 text-[10px] cursor-pointer"
              >
                <span className="bg-white/10 p-1.5 rounded-full flex items-center justify-center border border-white/20">
                  <Utensils className="w-3.5 h-3.5 text-white" />
                </span>
                EXPLORE MENU
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={() => setShowStoryModal(true)}
                className="flex items-center gap-2 text-gray-800 font-sans font-bold text-[10px] tracking-widest hover:text-brand-red transition-colors group cursor-pointer w-fit"
              >
                <span className="w-8 h-8 rounded-full border-2 border-brand-red flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all shadow-sm shrink-0">
                  <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                </span>
                WATCH OUR STORY
              </motion.button>
            </div>

          </motion.div>

        </div>



      </section>

      {/* WATCH OUR STORY INTERACTIVE MODAL */}
      <AnimatePresence>
        {showStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStoryModal(false)}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full relative z-10 shadow-2xl flex flex-col md:flex-row h-[90vh] max-h-[520px] md:h-[400px]"
            >

              {/* Close Button */}
              <button
                onClick={() => setShowStoryModal(false)}
                className="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-brand-red p-1.5 rounded-full transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Cooking video/placeholder */}
              <div className="w-full md:w-1/2 relative bg-gray-950 overflow-hidden h-44 md:h-full flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80"
                  alt="Cooking process"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent md:bg-gradient-to-r" />
                <div className="relative text-center p-4 text-white">
                  <span className="font-script text-4xl text-brand-yellow block">Chota Kalam</span>
                  <p className="text-2xs font-sans tracking-widest text-gray-300 uppercase font-semibold mt-1">Clay-Tandoor Secrets</p>
                </div>
              </div>

              {/* Right Side: Interactive Stories tab */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white h-full overflow-y-auto">
                <div>

                  {/* Tabs */}
                  <div className="flex gap-2 border-b border-gray-100 pb-3 mb-4">
                    {(['story', 'menu', 'values'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveStoryTab(tab)}
                        className={`text-2xs font-sans font-bold tracking-wider uppercase pb-1 border-b-2 transition-all ${activeStoryTab === tab
                          ? 'text-brand-red border-brand-red'
                          : 'text-gray-400 border-transparent hover:text-gray-600'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Content of Active Tab */}
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                    {storySlides[activeStoryTab].title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-4">
                    {storySlides[activeStoryTab].description}
                  </p>

                  <h4 className="text-2xs font-sans font-bold text-brand-yellow uppercase tracking-wider mb-2">
                    {storySlides[activeStoryTab].bulletTitle}
                  </h4>
                  <ul className="space-y-1">
                    {storySlides[activeStoryTab].bullets.map((bullet, idx) => (
                      <li key={idx} className="text-3xs text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Reservation Action inside Story modal */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-3xs font-serif font-bold text-gray-400">SALMAN RESTAURANT</span>
                  <button
                    onClick={() => {
                      setShowStoryModal(false);
                      onOpenBooking();
                    }}
                    className="bg-brand-red text-white text-3xs font-sans font-bold tracking-wider px-4 py-2 rounded-full hover:bg-brand-darkRed transition-colors"
                  >
                    BOOK A TABLE
                  </button>
                </div>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
