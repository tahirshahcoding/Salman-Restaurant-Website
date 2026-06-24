import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface SignatureDishesProps {
  onExploreMenu: () => void;
}

const DISHES = [
  {
    name: 'Dumba Shinwari Karahi',
    tag: 'Shinwari Special',
    desc: 'Slow-cooked mutton wok in tomatoes and natural fat. No dry spices — just pure, clean, addictive flavour.',
    price: 'Rs. 3,400',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    accent: 'bg-amber-50',
    badge: 'bg-brand-red',
  },
  {
    name: 'Special Platter',
    tag: 'Must-Try',
    desc: 'The ultimate BBQ feast — Malai Boti, Rajasthani Tikka, Turkish Kababs, Grilled Fish, and fresh naans.',
    price: 'From Rs. 6,500',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    accent: 'bg-red-50',
    badge: 'bg-brand-yellow',
  },
  {
    name: 'Kabuli Pulao',
    tag: 'Afghani Corner',
    desc: 'Fragrant beef-stock rice crowned with sweetened carrots, golden raisins, and a slow-braised mutton joint.',
    price: 'Rs. 800',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    accent: 'bg-yellow-50',
    badge: 'bg-gray-800',
  },
];

export default function SignatureDishes({ onExploreMenu }: SignatureDishesProps) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-brand-yellow" />
              <span className="text-xs font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">Must Try</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Signature <span className="text-brand-red font-script text-5xl md:text-6xl lg:text-7xl font-normal">Dishes</span>
            </h2>
          </div>
          <button
            onClick={onExploreMenu}
            className="flex items-center gap-2 text-sm font-sans font-bold text-brand-red hover:gap-4 transition-all cursor-pointer group shrink-0"
          >
            VIEW FULL MENU <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DISHES.map((dish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 shimmer-hover"
            >
              {/* Image */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className={`absolute top-4 left-4 ${dish.badge} text-white text-[10px] font-sans font-bold tracking-widest px-3 py-1.5 rounded-full uppercase`}>
                  {dish.tag}
                </span>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-white font-serif font-bold text-xl md:text-2xl leading-tight drop-shadow">
                    {dish.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className={`p-7 ${dish.accent}`}>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{dish.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-sans font-black text-brand-red text-xl">{dish.price}</span>
                  <button
                    onClick={onExploreMenu}
                    className="text-[11px] font-sans font-bold tracking-widest text-gray-500 hover:text-brand-red transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    ORDER NOW <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
