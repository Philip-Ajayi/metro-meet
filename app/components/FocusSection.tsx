'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, TrendingUp, Compass, Award } from 'lucide-react';

export default function FocusSection() {
  const takeaways = [
    {
      icon: <Landmark className="w-6 h-6" />,
      title: 'Mindset Transformation',
      desc: 'Understand how deep-seated psychological assumptions about money shape your financial actions and limitations.',
      color: 'from-amber-500 to-yellow-400',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Resource Growth',
      desc: 'Discover practical, data-backed models to multiply income, optimize active investments, and generate long-term residual wealth.',
      color: 'from-emerald-500 to-teal-400',
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: 'Strategic Navigation',
      desc: 'Navigate harsh economic landscapes with intelligence, leveraging strategy and structural tax/business frameworks.',
      color: 'from-blue-500 to-indigo-400',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Lasting Freedom',
      desc: 'Map out your journey to comprehensive financial independence so you can live out your life’s purpose without constraints.',
      color: 'from-purple-500 to-pink-400',
    },
  ];

  return (
    <section className="relative py-24 bg-slate-950/40 border-y border-slate-900 overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-extrabold tracking-widest text-metro-gold mb-3"
          >
            Metro Meet 4.0 Focus
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6"
          >
            Why Theme: <span className="text-metro-gold font-display italic font-medium">Money Matters?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 leading-relaxed font-light"
          >
            True financial growth is not accidental. It begins with changing how you process decisions, building high-income capacity, and learning the strategic secrets of institutional finance.
          </motion.p>
        </div>

        {/* Takeaway Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {takeaways.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 rounded-2xl bg-slate-900/30 backdrop-blur-md border border-slate-800/80 hover:border-slate-700/80 relative overflow-hidden group shadow-xl flex flex-col items-start text-left"
            >
              {/* Colored top gradient bar */}
              <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r ${item.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
              
              {/* Rounded icon box */}
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-metro-gold mb-6 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-metro-gold transition-colors">
                {item.title}
              </h3>
              
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
