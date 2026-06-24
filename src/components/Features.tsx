import React from 'react';
import { ChefHat, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-red">
          <path d="M3 19h18" />
          <path d="M5 19a7 7 0 0 1 14 0" />
          <path d="M12 5V3" />
          <path d="M11 3h2" />
        </svg>
      ),
      title: 'DELICIOUS FOOD',
      description: 'Made with the finest ingredients'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-yellow">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'FAMILY FRIENDLY',
      description: 'A perfect place for family and friends'
    },
    {
      icon: <ChefHat className="w-8 h-8 text-brand-red" strokeWidth={1.8} />,
      title: 'EXPERT TEAM',
      description: 'Experienced kitchen team crafting authentic flavors'
    },
    {
      icon: <MapPin className="w-8 h-8 text-brand-yellow" strokeWidth={1.8} />,
      title: 'VISIT US',
      description: 'Chota Kalam Ningolai Swat'
    }
  ];

  return (
    <section className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-20 mt-0 mb-20">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
        {features.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4 }}
            className={`flex items-start gap-5 p-3 sm:p-5 ${index === 0 ? 'pt-0' : 'pt-6 sm:pt-6 lg:pt-3 lg:pl-8'
              }`}
          >
            <div className="shrink-0 p-1 transition-colors">
              {item.icon}
            </div>
            <div className="text-left">
              <h3 className="font-sans font-bold text-gray-900 text-base tracking-wider mb-1.5">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-sans font-medium">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
