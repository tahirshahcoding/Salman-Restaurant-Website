import React, { useEffect, useRef, useState } from 'react';
import { Users, Compass, Award, Map } from 'lucide-react';
import { motion, useInView } from 'motion/react';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsBar() {
  const stats = [
    {
      icon: <Users className="w-9 h-9 opacity-85" />,
      number: 10000,
      suffix: '+',
      label: 'HAPPY CUSTOMERS'
    },
    {
      icon: <Compass className="w-9 h-9 opacity-85" />,
      number: 55,
      suffix: '+',
      label: 'DELICIOUS DISHES'
    },
    {
      icon: <Award className="w-9 h-9 opacity-85" />,
      number: 8,
      suffix: '',
      label: 'MENU CATEGORIES'
    },
    {
      icon: <Map className="w-9 h-9 opacity-85" />,
      number: 1,
      suffix: '',
      label: 'BRANCH'
    }
  ];

  return (
    <section className="bg-brand-red text-white py-14 relative overflow-hidden">

      {/* Decorative spinning rings */}
      <div className="absolute -top-16 -left-16 w-64 h-64 border border-white/10 rounded-full animate-spin-slow pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 border border-white/10 rounded-full animate-spin-slow-reverse pointer-events-none" />

      {/* Dot overlay */}
      <div className="absolute inset-0 opacity-[0.07] bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E')]" />

      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10 divide-x divide-white/20">
        {stats.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12, duration: 0.6, type: 'spring', stiffness: 80 }}
            key={idx}
            className="flex flex-col items-center justify-center p-4 border-none"
          >
            <motion.div
              className="mb-3"
              whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              {stat.icon}
            </motion.div>
            <span className="text-3xl md:text-4xl font-sans font-black mb-1.5 tracking-tight tabular-nums">
              <CountUp target={stat.number} suffix={stat.suffix} />
            </span>
            <span className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] text-white/80 leading-tight">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
